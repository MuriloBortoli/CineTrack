# Análise de tráfego HTTP


## Primeira requisição
site: https://developer.mozilla.org
url: https://developer.mozilla.org/pt-BR/
método: GET
status: 304 Not Modified


## CSS
https://developer.mozilla.org/static/client/styles-global.19cc0c980e463125.css
200 OK (from memory cache)
text/css


# JS
https://developer.mozilla.org/static/client/runtime.ca3a229d9f29a141.js
200 OK (from memory cache)
text/javascript


# IMG
https://developer.mozilla.org/static/ssr/mdn_contributor.9e2a105f50828d5a.png
200 OK (from memory cache)
image/png


# Provocando 404
https://developer.mozilla.org/pt-BR/caminhoquenaoexiste
404 Not Found



youtubei/v1/search?prettyPrint=false
POST
200 OK

Na Parte 2, o CineTrack usará o método GET na rota /filmes para listar os filmes. Seguindo o REST visto em aula, a URL /filmes identifica o recurso (a coleção de filmes) e o método GET expressa a operação de leitura, sem verbo no caminho (nada de /listarFilmes). A rota também poderá receber o parâmetro ?status= para filtrar, como em /filmes?status=assistido. Em caso de sucesso, a resposta virá com status 200 OK e Content-Type: application/json