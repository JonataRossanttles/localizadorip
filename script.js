key = 'at_jhKFiIJKNpY3dgHRvJpQT8VCII5LR'
ip = '201.18.224.178 http://www.vtal.com  www.claro.com.br 177.56.183.188 "akamai.com"'
//let linkip = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_jhKFiIJKNpY3dgHRvJpQT8VCII5LR&ipAddress=104.119.91.221`
//let linkdomain = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_jhKFiIJKNpY3dgHRvJpQT8VCII5LR&domain=www.vivo.com.br`

var ip = document.getElementById('endereço-ip') 
var localizacao = document.getElementById('localização') 
var fuso_horario = document.getElementById('fuso horario')
var provedor = document.getElementById('provedor')


// Criação do mapa sem nenhuma marcação
var map = L.map('map').setView([40.7551, -74.1907], 13)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker

function pesquisar(){
    var input = document.getElementsByTagName('input')[0]
    var information = input.value
    resposta = information.replace(/\s/g, "");
    information_final = resposta[resposta.length - 1]

    if (!isNaN(information_final)){
        
            var linkip = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_jhKFiIJKNpY3dgHRvJpQT8VCII5LR&ipAddress=${resposta}`
            fetch(linkip)
            .then(resolve => resolve.json())
            .then(dados => {
                var latitude = dados.location.lat
                var longitude = dados.location.lng
                ip.innerText = dados.ip
                localizacao.innerText = dados.location.city + ', '+ dados.location.region + ' ' + dados.location.postalCode
                fuso_horario.innerText = 'UTC ' + dados.location.timezone
                provedor.innerText = dados.isp
                // Informa a localização no mapa
                map.setView([latitude, longitude], 13);
                // Verifica se não existe o marcador no mapa, se não existir, criará um marcador
                if (!marker) {
                    marker = L.marker([latitude, longitude]).addTo(map);
                }
                // Uma vez existindo apenas atualizará a nova latitude e longitude no mapa do marcador
                marker.setLatLng([latitude, longitude]).update();
                marker.bindPopup("Localização do IP").openPopup();
                console.log(dados)

            }

            ).catch(reject => {
                console.log('Pau')
            })
       
        
    }else{
               
            var linkdomain = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_jhKFiIJKNpY3dgHRvJpQT8VCII5LR&domain=${resposta}`
            input.value = information
            fetch(linkdomain)
            .then(resolve => resolve.json())
            .then(dados => {
                console.log(dados)
                var latitude = dados.location.lat
                var longitude = dados.location.lng
                ip.innerText = dados.ip
                localizacao.innerText = dados.location.city + ', '+ dados.location.region + ' ' + dados.location.postalCode
                fuso_horario.innerText = 'UTC ' + dados.location.timezone
                provedor.innerText = dados.isp
                // Informa a localização no mapa
                map.setView([latitude, longitude], 13);
                // Verifica se não existe o marcador no mapa, se não existir, criará um marcador
                if (!marker) {
                    marker = L.marker([latitude, longitude]).addTo(map);
                }
                // Uma vez existindo apenas atualizará a nova latitude e longitude no mapa do marcador
                marker.setLatLng([latitude, longitude]).update();
                marker.bindPopup("Localização do IP").openPopup();    

            }

            ).catch(reject => {
                console.log('Deu Pau')
            })
            
            
        }
}


  









