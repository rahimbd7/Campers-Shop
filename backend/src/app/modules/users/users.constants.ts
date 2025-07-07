 const USER_ROLE = {
    user: 'user',
    admin: 'admin',
} as const;


export type TUSER = keyof typeof USER_ROLE;