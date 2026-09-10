const state = {
  communities: [],
  municipalities: [],
  documents: [],
  selectedId: null,
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

function municipalityName(id) {
  return state.municipalities.find((item) => item.id === id)?.nome || 'Município não informado';
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
  const target = $('#map-markers');
  target.innerHTML = '';
  if (!state.communities.length) return;
  const latitudes = state.communities.map((item) => item.latitude);
  const longitudes = state.communities.map((item) => item.longitude);
  const latMin = Math.min(...latitudes) - 0.12;
  const latMax = Math.max(...latitudes) + 0.12;
  const lonMin = Math.min(...longitudes) - 0.12;
  const lonMax = Math.max(...longitudes) + 0.12;
  state.communities.forEach((community) => {
    const left = 13 + ((community.longitude - lonMin) / (lonMax - lonMin)) * 74;
    const top = 12 + (1 - (community.latitude - latMin) / (latMax - latMin)) * 72;
    const marker = document.createElement('div');
    marker.className = `map-marker ${community.certificado_fcp ? 'certified' : ''} ${state.selectedId === community.id ? 'selected' : ''}`;
    marker.style.left = `${left}%`;
    marker.style.top = `${top}%`;
    marker.innerHTML = `<button type="button" aria-label="Ver ${community.nome}"></button>`;
    marker.addEventListener('click', () => selectCommunity(community.id));
    target.appendChild(marker);
  });
  $('#map-count').textContent = `${state.communities.length} ponto${state.communities.length === 1 ? '' : 's'}`;
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

function selectCommunity(id) {
  state.selectedId = id;
  const community = state.communities.find((item) => item.id === id);
  if (!community) return;
  renderCommunities();
  const territoryText = community.territorio ? `Área territorial: ${community.territorio.area_hectares || 'não informada'} ha · fase ${community.territorio.fase_titulacao || 'não informada'}` : 'Dados territoriais ainda não registrados.';
  showToast(`${community.nome} · ${territoryText}`);
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
$('#mobile-menu').addEventListener('click', () => $('.sidebar').classList.toggle('open'));
document.querySelectorAll('.nav-item').forEach((item) => item.addEventListener('click', () => { switchView(item.dataset.view); $('.sidebar').classList.remove('open'); }));

init();
