# RELATÓRIO TÉCNICO: FLUXO DE COMUNICAÇÃO INTER-REDES VIA GATEWAY PADRÃO

**Instituição:** Instituto Federal do Maranhão (IFMA)  
**Disciplina:** Redes de Computadores / Arquitetura de Redes  
**Ambiente:** Cisco Packet Tracer  

---

### 1. Decisão de Entrega: Local vs. Remoto (Operação Bitwise AND)

Antes de transmitir qualquer frame para a rede física, o protocolo IP na máquina de origem (**PC0**) precisa determinar se o destino encontra-se no mesmo segmento de rede (entrega direta) ou em uma rede externa (entrega indireta)[cite: 4]. Para isso, o sistema operacional realiza uma operação lógica **AND** no nível de bits entre os endereços IP e a máscara de rede `/24` (`255.255.255.0`)[cite: 4]:

* **Cálculo para a Rede de Origem (PC0):**
  * IP do PC0: `192.168.10.10` = `11000000.10101000.00001010.00001010`
  * Máscara `/24`: `255.255.255.0` = `11111111.11111111.11111111.00000000`
  * **Resultado AND:** `192.168.10.0` (ID da Rede Local)[cite: 4]

* **Cálculo para a Rede de Destino (Servidor):**
  * IP do Servidor: `192.168.20.50` = `11000000.10101000.00010100.00110010`
  * Máscara `/24`: `255.255.255.0` = `11111111.11111111.11111111.00000000`
  * **Resultado AND:** `192.168.20.0` (ID da Rede Destino)[cite: 4]

**Conclusão da Camada de Rede:** Como `192.168.10.0` != `192.168.20.0`, o PC0 identifica que o destino é **REMOTO**[cite: 4]. Dessa forma, o pacote **não pode ser entregue diretamente ao Servidor**; ele deve obrigatoriamente ser enviado para o **Gateway Padrão** (`192.168.10.1`)[cite: 4].

---

### 2. O Papel do Protocolo ARP na Comunicação Remota

Mesmo sabendo que o destino final é o IP `192.168.20.50`, a Camada de Enlace (Ethernet) do PC0 precisa do endereço físico (**MAC Address**) da máquina que receberá o quadro localmente[cite: 3, 4].

* **Por que o PC0 não busca o MAC do Servidor Final?**  
  Quadros Ethernet (Camada 2) são delimitados ao mesmo domínio de broadcast local e não atravessam roteadores[cite: 3, 4]. O PC0 entende que não possui acesso direto à interface física do Servidor Remoto[cite: 4]. Por isso, o próximo salto físico é a interface de entrada do Roteador[cite: 3, 4].

* **Execução do ARP Request:**
  * Com o Cache ARP limpo, o PC0 envia um pacote **ARP Request** em *Broadcast* (`FF:FF:FF:FF:FF:FF`)[cite: 4].
  * **Pergunta do ARP:** *"Quem possui o IP `192.168.10.1` (Gateway)? Responda para `192.168.10.10`."*[cite: 4]
  * O Roteador responde via *Unicast* (**ARP Reply**) informando o seu próprio MAC de interface local (`MAC_Roteador_LAN`)[cite: 4].

---

### 3. Alterações de Cabeçalho na Camada 2 vs. Camada 3

A dinâmica do transporte de dados diferencia a responsabilidade do roteamento lógico (Camada 3) do transporte físico local (Camada 2)[cite: 3]:

* **Camada 3 (Pacote IP - Fim-a-Fim / End-to-End):**
  * **IP Origem:** `192.168.10.10` (Permanece **INALTERADO** do PC0 ao Servidor)[cite: 3, 4].
  * **IP Destino:** `192.168.20.50` (Permanece **INALTERADO** do PC0 ao Servidor)[cite: 3, 4].

* **Camada 2 (Quadro Ethernet - Salto-a-Salto / Hop-by-Hop):**
  * **Trecho 1 (PC0 -> Roteador):**
    * MAC Origem: `MAC_PC0`[cite: 3, 4]
    * MAC Destino: `MAC_Roteador_LAN`[cite: 3, 4]
  * **Trecho 2 (Roteador -> Servidor Remoto):**
    * MAC Origem: `MAC_Roteador_WAN` (Nova interface de saída do Roteador)[cite: 3, 4]
    * MAC Destino: `MAC_Servidor`[cite: 3, 4]

> **Regra Fundamental:** Os endereços IP identificam a origem e o destino final do pacote[cite: 3, 4]. Os endereços MAC mudam a cada roteador (salto) que o pacote atravessa ao longo do caminho[cite: 3, 4].

---

### 4. Inspeção no Cisco Packet Tracer: Janela "PDU Information" no Roteador

Ao abrir o envelope no Roteador dentro do **Modo Simulação** do Packet Tracer, observam-se os dados de entrada e saída no equipamento[cite: 3]:

#### Aba 1: `Inbound PDU Details` (Quadro que CHEGOU ao Roteador)[cite: 3]
* **Layer 2 (Ethernet II):**
  * `Src MAC:` `0060.0F2A.1111` (MAC do PC0)[cite: 3, 4]
  * `Dst MAC:` `00D0.BA81.2222` (MAC da interface LAN do Roteador)[cite: 3, 4]
* **Layer 3 (IP Header):**
  * `Src IP:` `192.168.10.10`[cite: 3, 4]
  * `Dst IP:` `192.168.20.50`[cite: 3, 4]

#### Aba 2: `Outbound PDU Details` (Quadro que SAI do Roteador)[cite: 3]
* **Layer 2 (Ethernet II):**
  * `Src MAC:` `00D0.BA81.3333` (MAC da interface de saída do Roteador)[cite: 3, 4]
  * `Dst MAC:` `0002.4A99.4444` (MAC do Servidor de Destino)[cite: 3, 4]
* **Layer 3 (IP Header):**
  * `Src IP:` `192.168.10.10` (Mantido)[cite: 3, 4]
  * `Dst IP:` `192.168.20.50` (Mantido)[cite: 3, 4]