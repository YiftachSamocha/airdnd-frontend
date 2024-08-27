
export function createOrder() {
    return {
        _id: 'o1225',
        host: { _id: 'u102', fullname: "bob", imgUrl: "..." },
        guest: {
            _id: 'u101',
            fullname: 'User 1',
        },
        totalPrice: 160,
        startDate: '2025/10/15',
        endDate: '2025/10/17',
        guests: {
            adults: 1,
            kids: 2,
        },
        stay: {
            // mini-stay
            _id: 'h102',
            name: 'House Of Uncle My',
            price: 80.0,
        },
        msgs: [], // host - guest chat
        status: 'pending', // approved / rejected
    }
}