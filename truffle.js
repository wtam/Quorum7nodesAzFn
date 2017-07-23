module.exports = {
  networks: {
    development: {
      host: "quorumdemo7nodes.eastasia.cloudapp.azure.com",
      port: 22000, //was 8545
      network_id: "87234" // Match any network id
    },
    nodetwo:  {
      host: "quorumdemo7nodes.eastasia.cloudapp.azure.com",
      port: 22001,
      network_id: "87234" // Match any network id
    },
    nodethree:  {
      host: "quorumdemo7nodes.eastasia.cloudapp.azure.com",
      port: 22002,
      network_id: "*" // Match any network id
    },
    nodefour:  {
      host: "quorumdemo7nodes.eastasia.cloudapp.azure.com",
      port: 22003,
      network_id: "*" // Match any network id
    },
    nodefive:  {
      host: "quorumdemo7nodes.eastasia.cloudapp.azure.com",
      port: 22005,
      network_id: "*" // Match any network id
    },
    nodesix:  {
      host: "quorumdemo7nodes.eastasia.cloudapp.azure.com",
      port: 22005,
      network_id: "*" // Match any network id
    },
    nodeseven:  {
      host: "quorumdemo7nodes.eastasia.cloudapp.azure.com",
      port: 22006,
      network_id: "*" // Match any network id
    }
  }
};