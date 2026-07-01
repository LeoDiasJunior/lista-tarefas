Lista de Tarefas

Aluno: Leonidas

Aplicativo mobile com React Native/Expo Lista de Compras/Tarefas (componentes basicos, useState, TextInput, FlatList e persistencia local com AsyncStorage)


Aplicativo mobile desenvolvido em React Native com Expo que permite gerenciar uma lista de tarefas/compras. O usuáaio pode adicionar novos itens, visualiza-los em uma lista, marcar como comprados/concluídos, excluir itens e limpar a lista inteira. Os dados sao salvos localmente com AsyncStorage, permanecendo disponíveis mesmo apos fechar e reabrir o app.

- Adicionar novos itens a lista
- Listagem dos itens com FlatList
- Marcar item como comprado (toque no item)
- Excluir item da lista
- Persistencia local dos dados com AsyncStorage
- Contador de itens comprados e pendentes
- Botao para limpar toda a lista
- Destaque visual dos itens comprados (texto riscado e cor diferenciada)

O que foi usado:
- React Native
- Expo
- TypeScript
- AsyncStorage (`@react-native-async-storage/async-storage`)

Como rodar:
1. Clone o repositorio:
   git clone https://github.com/LeoDiasJunior/lista-tarefas.git
   cd lista-tarefas
2. Instale as dependencias:
   npm install
3. Inicie o projeto:
   npx expo start

4. Abra o app no celular usando o aplicativo Expo Go(escaneando o QR Code) ou em um emulador Android/iOS.
