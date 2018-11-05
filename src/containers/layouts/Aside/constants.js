export const AsideInfo = [
    {
        name: '템플릿 관리',
        url: '/templates',
        children: [
            {
                name: '새로운 템플릿',
                url: '/templates/create'
            },
            {
                name: '템플릿 내역',
                url: '/templates/home'
            },
        ]
    },
    {
        name: '메시지 관리',
        url: '/messages',
        children: [
            {
                name: '메시지 내역',
                url: '/messages/home'
            },
            {
                name: '메시지 발송',
                url: '/messages/create'
            }
        ]
    },
    {
        name: '서비스 설정',
        url: '/utils',
        children: []
    }
]