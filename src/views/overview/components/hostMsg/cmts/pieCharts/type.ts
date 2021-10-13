export interface Nodes {
    title: string
    ref: string
    color: string[]
    col: {
        name: string
        color: string
        value: number
    }[]
}
export interface Props {
    option: Nodes
}
// {
//     title: '主机离线统计',
//     ref: 'pieOne',
//     color: [
//       'rgba(88, 132, 222, 1)',
//       'rgba(88, 132, 222, 0.6)',
//       'rgba(88, 132, 222, 0.2)'
//     ],
//     col: [
//       {
//         name: '3 - 7天',
//         color: 'rgba(88, 132, 222, 1)',
//         value: 99
//       },
//       {
//         name: '7 - 16天',
//         color: 'rgba(88, 132, 222, 0.6)',
//         value: 120
//       },
//       {
//         name: '15天以上',
//         color: 'rgba(88, 132, 222, 0.2)',
//         value: 19
//       }
//     ]
//   },