// import { storageService } from './async-storage.service.js';
// import { makeId, getRandomItems, getRandomIntInclusive } from "./util.service.js";
// import { fullnames, locations } from "./stay.data.js";

// export const HOSTS_STORAGE_KEY = 'hosts';

//  _createHostsData()

// export const hostService = {
//     query,
//     getById,
//     save,
//     remove,
//     createHosts,
//     createHost,
// }

// async function query() {
//     return await storageService.query(HOSTS_STORAGE_KEY);
// }

// async function getById(hostId) {
//     return await storageService.get(HOSTS_STORAGE_KEY, hostId);
// }

// async function save(host) {
//     if (host._id) {
//         return await storageService.put(HOSTS_STORAGE_KEY, host);
//     } else {
//         return await storageService.post(HOSTS_STORAGE_KEY, host);
//     }
// }

// async function remove(hostId) {
//     return await storageService.remove(HOSTS_STORAGE_KEY, hostId);
// }

// async function createHosts() {
//     const availableLocations = locations.filter(location => location.country !== 'Im flexible');
//     const hosts = [];

//     for (let i = 0; i < availableLocations.length; i++) {
//         const location = availableLocations[i];
//         const host = await createHost(location);
//         hosts.push(host);
//     }

//     await Promise.all(hosts.map(host => save(host))); // Save all hosts in the storage
//     return hosts;
// }



// async function _createHostsData(length = 24) {
//     debugger
//     const currData = JSON.parse(localStorage.getItem(HOSTS_STORAGE_KEY));
//     if (!currData || currData.length === 0) {
//         const hosts = [];
//         for (var i = 0; i < length; i++) {
//             const location = locations[i % locations.length];  // Ensure there's a location to pass
//             const host = await createHost(location);
//             if (host) {
//                 hosts.push(host);
//             } else {
//                 console.error('Host creation failed at index', i);
//             }
//         }
//         console.log("Final hosts array:", hosts); // Debugging line

//         localStorage.setItem(HOSTS_STORAGE_KEY, JSON.stringify(hosts));
//     }
// }