export const SOCKET_EVENT = {
  JOIN_ROOM: 'join-room',
  WELCOME_USER: 'welcome',
  SAVE_NICKNAME: 'nick-name',
} as const;

export type EVENT = (typeof SOCKET_EVENT)[keyof typeof SOCKET_EVENT];
