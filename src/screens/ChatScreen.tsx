import React, { useMemo, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen } from '@/components/Screen';

type ChatMessage = {
  id: string;
  body: string;
  sender: 'peer' | 'self';
};

export function ChatScreen(): React.JSX.Element {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', body: 'Gate B is less crowded now.', sender: 'peer' },
    { id: '2', body: '[ADMIN] Weather alert: heavy rain expected in 20 minutes. Move to covered areas.', sender: 'peer' }
  ]);

  const hasMessages = messages.length > 0;

  const onSend = useMemo(
    () => () => {
      const trimmed = message.trim();
      if (trimmed.length === 0) return;

      setMessages((current) => [...current, { id: `${Date.now()}`, body: trimmed, sender: 'self' }]);
      setMessage('');
    },
    [message]
  );

  return (
    <Screen>
      <Text style={styles.title}>Group Chat</Text>
      <View style={styles.listWrapper}>
        {!hasMessages ? (
          <Text>No messages yet.</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.listContent}>
            {messages.map((item) => {
              const isAdmin = item.body.startsWith('[ADMIN]');
              const displayBody = isAdmin ? item.body.replace(/^\[ADMIN\]\s*/, '') : item.body;
              const isSelf = item.sender === 'self';

              return (
                <View
                  key={item.id}
                  style={[
                    styles.messageCard,
                    isSelf ? styles.selfMessage : styles.peerMessage,
                    isAdmin ? styles.adminMessage : undefined
                  ]}
                >
                  {isAdmin ? <Text style={styles.adminBadge}>ADMIN ALERT</Text> : null}
                  <Text style={isAdmin ? styles.adminBody : styles.messageBody}>{displayBody}</Text>
                </View>
              );
            })}
          </ScrollView>
        )}
      </View>
      <TextInput
        placeholder="Message your group"
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <Button title="Send" onPress={onSend} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700'
  },
  listWrapper: {
    flex: 1,
    marginTop: 16,
    marginBottom: 12
  },
  listContent: {
    gap: 10,
    paddingBottom: 8
  },
  messageCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    maxWidth: '92%'
  },
  peerMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f3f5',
    borderColor: '#dfe4ea'
  },
  selfMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d8f3e8',
    borderColor: '#9ed7bf'
  },
  adminMessage: {
    backgroundColor: '#fff3e0',
    borderColor: '#f08c00',
    borderLeftWidth: 5
  },
  adminBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f08c00',
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    marginBottom: 8
  },
  messageBody: {
    color: '#1f2933',
    fontSize: 16,
    lineHeight: 22
  },
  adminBody: {
    color: '#7c2d12',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8
  }
});
