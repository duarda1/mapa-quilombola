const state = {
  communities: [],
  municipalities: [],
  documents: [],
  selectedId: null,
  map: null,
  markers: null,
  draftMarker: null,
  tileWarningShown: false,
};

const $ = (selector) => document.querySelector(selector);
const api = async (path, options = {}) => {
  const response = await fetch(path, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.erro || data.message || 'Não foi possível concluir a operação.');
  return data;
};

function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(value || 0);
}

function updateStats() {
  const certified = state.communities.filter((item) => item.certificado_fcp).length;
  const families = state.communities.reduce((total, item) => total + (item.qtd_familias || 0), 0);
  $('#stat-communities').textContent = formatNumber(state.communities.length);
  $('#stat-certified').textContent = formatNumber(certified);
  $('#stat-municipalities').textContent = formatNumber(state.municipalities.length);
  $('#stat-families').textContent = formatNumber(families);
}

function renderMunicipalityFilters() {
  const options = state.municipalities.map((item) => `<option value="${item.id}">${item.nome}</option>`).join('');
  $('#municipality-filter').insertAdjacentHTML('beforeend', options);
  $('#form-municipality').insertAdjacentHTML('beforeend', options);
}

function renderMap() {
  if (!state.map || !state.markers) return;
  state.markers.clearLayers();
  if (!state.communities.length) return;
  state.communities.forEach((community) => {
    const marker = L.circleMarker([community.latitude, community.longitude], {
      radius: 8,
      color: '#ffffff',
      weight: 2,
      fillColor: community.certificado_fcp ? '#2f6f59' : '#d9a548',
      fillOpacity: 0.95,
    });
    marker.bindPopup(`<strong>${community.nome}</strong><br><span>${community.municipio} · ${community.qtd_familias ?? '—'} fam.</span><br><small>${community.certificado_fcp ? 'Certificada FCP' : 'Em registro'}</small><br><button type="button" class="popup-more" data-community-id="${community.id}">Ver +</button>`, {
      closeButton: true,
      autoClose: true,
      className: 'community-popup',
    });
    marker.addTo(state.markers);
  });
  const bounds = L.latLngBounds(state.communities.map((community) => [community.latitude, community.longitude]));
  state.map.fitBounds(bounds.pad(0.22), { maxZoom: 10, animate: false });
  $('#map-count').textContent = `${state.communities.length} ponto${state.communities.length === 1 ? '' : 's'}`;
}

function initializeMap() {
  state.map = L.map('map').setView([-3.4, -44.35], 8);
  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(state.map);
  tiles.on('tileerror', () => {
    if (!state.tileWarningShown) {
      state.tileWarningShown = true;
      $('#map-notice').hidden = false;
    }
  });
  state.markers = L.layerGroup().addTo(state.map);
  state.map.on('popupopen', (event) => {
    const moreButton = event.popup.getElement()?.querySelector('.popup-more');
    if (moreButton) {
      moreButton.addEventListener('click', () => {
        event.popup.close();
        selectCommunity(Number(moreButton.dataset.communityId));
      });
    }
  });
  state.map.on('click', (event) => {
    const { lat, lng } = event.latlng;
    $('[name="latitude"]').value = lat.toFixed(7);
    $('[name="longitude"]').value = lng.toFixed(7);
    if (state.draftMarker) state.map.removeLayer(state.draftMarker);
    state.draftMarker = L.marker([lat, lng]).addTo(state.map).bindPopup('Ponto selecionado para cadastro').openPopup();
    toggleForm(true);
    showToast('Coordenadas preenchidas a partir do mapa.');
  });
}

function renderCommunities() {
  const list = $('#community-list');
  $('#results-caption').textContent = `${state.communities.length} registro${state.communities.length === 1 ? '' : 's'} encontrado${state.communities.length === 1 ? '' : 's'}`;
  if (!state.communities.length) {
    list.innerHTML = '<div class="empty-state">Nenhuma comunidade corresponde aos filtros atuais.</div>';
    renderMap();
    return;
  }
  list.innerHTML = state.communities.map((community) => `
    <article class="community-item ${community.certificado_fcp ? '' : 'pending'} ${state.selectedId === community.id ? 'selected' : ''}" data-community-id="${community.id}" tabindex="0">
      <div class="community-thumb">⌖</div>
      <div class="community-info"><strong>${community.nome}</strong><span>${community.municipio} · ${community.qtd_familias ? `${formatNumber(community.qtd_familias)} famílias` : 'famílias não informadas'}</span></div>
      <i class="community-status ${community.certificado_fcp ? 'certified' : ''}" title="${community.certificado_fcp ? 'Certificada' : 'Em registro'}"></i>
    </article>`).join('');
  list.querySelectorAll('.community-item').forEach((item) => {
    item.addEventListener('click', () => selectCommunity(Number(item.dataset.communityId)));
    item.addEventListener('keydown', (event) => { if (event.key === 'Enter') selectCommunity(Number(item.dataset.communityId)); });
  });
  renderMap();
}

async function selectCommunity(id) {
  state.selectedId = id;
  const community = state.communities.find((item) => item.id === id);
  if (!community) return;
  renderCommunities();
  try {
    const details = await api(`/comunidades/${id}`);
    renderCommunityDetails(details);
    const territory = details.territorios?.[0];
    const territoryText = territory ? `Área territorial: ${territory.area_hectares || 'não informada'} ha · fase ${territory.fase_titulacao || 'não informada'}` : 'Dados territoriais ainda não registrados.';
    showToast(`${details.nome} · ${territoryText}`);
  } catch (error) {
    showToast(error.message);
  }
}

function renderCommunityDetails(details) {
  const territory = details.territorios?.[0];
  const certification = details.certificado_fcp
    ? `Certificada${details.data_certificacao ? ` em ${details.data_certificacao}` : ''}`
    : 'Em registro';
  const territoryText = territory
    ? `Território: ${territory.area_hectares ?? 'Área não informada'} ha · fase ${territory.fase_titulacao || 'Fase não informada'} · órgão ${territory.orgao_responsavel || 'Não informado'}.`
    : 'Nenhum dado territorial registrado.';
  const content = `<div class="detail-grid"><div class="detail-item"><span>Município</span><strong>${details.municipio} - ${details.uf}</strong></div><div class="detail-item"><span>Famílias</span><strong>${details.qtd_familias ?? 'Não informadas'}</strong></div><div class="detail-item"><span>População estimada</span><strong>${details.populacao_estimada ?? 'Não informada'}</strong></div><div class="detail-item"><span>Coordenadas</span><strong>${details.latitude}, ${details.longitude}</strong></div></div><p class="detail-territory">${territoryText}</p>`;
  const panel = $('#community-details');
  panel.innerHTML = `<div class="detail-heading"><div><p class="eyebrow">Detalhes da comunidade</p><h2>${details.nome}</h2></div><span class="map-count">${certification}</span></div>${content}`;
  panel.hidden = false;
  $('#community-modal-title').textContent = details.nome;
  $('#community-modal-content').innerHTML = `<div class="detail-heading"><span class="map-count">${certification}</span></div>${content}`;
  $('#community-modal').hidden = false;
}

async function loadCommunities() {
  const params = new URLSearchParams();
  const name = $('#search-input').value.trim();
  const municipality = $('#municipality-filter').value;
  const certification = $('#certification-filter').value;
  if (name) params.set('nome', name);
  if (municipality) params.set('municipio_id', municipality);
  if (certification) params.set('certificado_fcp', certification);
  state.communities = await api(`/comunidades?${params.toString()}`);
  updateStats();
  renderCommunities();
}

function renderDocuments() {
  $('#document-count').textContent = `${state.documents.length} arquivo${state.documents.length === 1 ? '' : 's'}`;
  $('#document-list').innerHTML = state.documents.length ? state.documents.map((document) => `<tr><td>${document.nome_arquivo}</td><td>${document.atividade || 'Sem atividade'}</td><td>${document.comunidade || 'Documento do projeto'}</td><td><span class="format-pill">${document.formato.toUpperCase()}</span></td><td>${document.caminho_storage}</td></tr>`).join('') : '<tr><td colspan="5">Nenhum documento encontrado.</td></tr>';
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 4200);
}

function toggleForm(open) {
  $('#form-modal').hidden = !open;
  if (open) $('#community-form input[name="nome"]').focus();
}

async function submitForm(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const payload = {
    nome: form.get('nome'), municipio_id: Number(form.get('municipio_id')),
    latitude: Number(form.get('latitude')), longitude: Number(form.get('longitude')),
    qtd_familias: form.get('qtd_familias') ? Number(form.get('qtd_familias')) : null,
    populacao_estimada: form.get('populacao_estimada') ? Number(form.get('populacao_estimada')) : null,
    certificado_fcp: form.get('certificado_fcp') === 'on',
    data_certificacao: form.get('data_certificacao') || null,
  };
  $('#form-feedback').textContent = '';
  try {
    await api('/comunidades', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    toggleForm(false);
    event.target.reset();
    $('#certification-date-field').hidden = true;
    await loadCommunities();
    showToast('Comunidade cadastrada com sucesso.');
  } catch (error) {
    $('#form-feedback').textContent = error.message;
  }
}

function switchView(viewName) {
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === viewName));
  document.querySelectorAll('.view').forEach((view) => view.classList.toggle('active', view.id === `view-${viewName}`));
  $('#breadcrumb-label').textContent = viewName === 'documentos' ? 'Documentos' : 'Explorar mapa';
  if (viewName === 'documentos') renderDocuments();
}

async function init() {
  try {
    initializeMap();
    const [municipalities, documents] = await Promise.all([api('/municipios'), api('/documentos')]);
    state.municipalities = municipalities;
    state.documents = documents;
    renderMunicipalityFilters();
    await loadCommunities();
  } catch (error) {
    $('#results-caption').textContent = error.message;
    $('#community-list').innerHTML = `<div class="empty-state">${error.message}<br>Verifique se a API Flask está em execução.</div>`;
    $('.api-status').innerHTML = '<i style="background:#b85f4a"></i> API indisponível';
  }
}

$('#search-input').addEventListener('input', loadCommunities);
$('#municipality-filter').addEventListener('change', loadCommunities);
$('#certification-filter').addEventListener('change', loadCommunities);
$('#clear-filters').addEventListener('click', () => { $('#search-input').value = ''; $('#municipality-filter').value = ''; $('#certification-filter').value = ''; loadCommunities(); });
$('#open-form').addEventListener('click', () => toggleForm(true));
$('#close-form').addEventListener('click', () => toggleForm(false));
$('#cancel-form').addEventListener('click', () => toggleForm(false));
$('#community-form').addEventListener('submit', submitForm);
$('#form-certified').addEventListener('change', (event) => { $('#certification-date-field').hidden = !event.target.checked; });
$('#form-modal').addEventListener('click', (event) => { if (event.target.id === 'form-modal') toggleForm(false); });
$('#close-community-modal').addEventListener('click', () => { $('#community-modal').hidden = true; });
$('#community-modal').addEventListener('click', (event) => { if (event.target.id === 'community-modal') $('#community-modal').hidden = true; });
$('#mobile-menu').addEventListener('click', () => $('.sidebar').classList.toggle('open'));
document.querySelectorAll('.nav-item').forEach((item) => item.addEventListener('click', () => { switchView(item.dataset.view); $('.sidebar').classList.remove('open'); }));

init();
