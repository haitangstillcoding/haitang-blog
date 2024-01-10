const nav = [
    {
        text: '首页',
        link: '/'
    },
    {
        text: 'Java',
        items: [
            { text: 'JavaSE', link: '/blog/java/javase/' },
            { text: 'JVM', link: '/blog/java/jvm/' },
            { text: 'JUC', link: '/blog/java/juc/' },
        ]
    },
    {
        text: 'Database',
        items: [
            { text: 'MySQL', link: '/blog/database/mysql/' },
            { text: 'Redis', link: '/blog/database/redis/' },
            { text: 'MongoDB', link: '/blog/database/mongodb/' },
            { text: 'Elasticsearch', link: '/blog/database/elasticsearch/' },
        ]
    },
    {
        text: 'Spring',
        items: [
            { text: 'Springframework', link: '/blog/spring/springframework/' },
            { text: 'SpringMVC', link: '/blog/spring/springmvc/' },
            { text: 'SpringBoot', link: '/blog/spring/springboot/' },
        ]
    },
    {
        text: 'Devops',
        items: [
            { text: 'Docker', link: '/blog/devops/docker/' },
            { text: 'Nginx', link: '/blog/devops/nginx/' },
            { text: 'Kubernetes', link: '/blog/devops/kubernetes/' },
        ]
    },
    {
        text: '消息队列',
        items: [
            { text: 'Kafka', link: '/blog/mq/kafka/' },
            { text: 'RabbitMQ', link: '/blog/mq/rabbitmq/' },
        ]
    },
    {
        text: '我的站点',
        items: [
            {
                text: 'LskyPro 图床',
                link: 'http://www.haitang.icu:9999/'
            },
            {
                text: 'Draw.io 在线画图',
                link: 'http://www.haitang.icu:6442/'
            },
        ]
    },
    {
        text: '力扣刷题',
        items: [
            { text: '算法', link: '/blog/leetcode/algorithm/' },
            { text: '数据库', link: '/blog/leetcode/database/' },
        ]
    },
]
export default nav;