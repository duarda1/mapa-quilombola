# Topologia de Rede - Centro de Memórias

```mermaid
graph TD; Provedor([Provedor - Fibra]) --- ONT[ONT]; ONT ---|Cabo Cat6| Roteador[Roteador - Borda]; subgraph Switch_Central [Switch Managed 24p]; SW[Switch Principal]; end; Roteador ---|Cabo Cat6| SW; SW ---|Cabo Cat6| Servidor[(Servidor do Mapa)]; SW ---|Cabo Cat6| ADM[Administração: PC + Impressora]; SW ---|Cabo Cat6| LAB[Laboratório: 20 PCs]; SW ---|Cabo Cat6| AP[Access Point]; AP -.->|Wi-Fi Privado| Profs[Professores: Laptops]; AP -.->|Wi-Fi Público| Visitas[Área de Visitantes];