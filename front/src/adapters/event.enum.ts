/**
 * SOCKET EVENT CONSTANTS
 * @type {Object}
 * @property {string} JOIN_ROOM
 * @property {string} SAVE_NICKNAME
 */
export const SOCKET_ENUM = {
  JOIN_ROOM: 'join-room',
  SAVE_NICKNAME: 'nick-name',
} as const;

export type EVENT = (typeof SOCKET_ENUM)[keyof typeof SOCKET_ENUM];
