
# Integrazione app a wordpress

- Entra all'interno della cartella del tuo tema, es: themebase.
- Se non esiste crea inc/assets/react-a ( Qui andranno cose come: file.js dell'app )
- All'interno di react-a crea /assets ( Qui andranno tutti i nostri assets dell'app)
- Crea sulla root del tuo tema, page-prova.php (chiamala come vuoi)
- Inserisci il seguente contenuto all'interno di page-prova.php:
```php
<?php
/*
Template Name: prova page
*/
get_header();

?>

<div id="root"></div>

<?php
get_footer();
?>
```
- Crea una pagina da wordpress e dagli lo stesso slug della pagina precedente, es: page-prova.php, la chiamerai solamente Prova.
- Spostiamoci sul functions.php, ed inseriamo questo codice alla fine del file (questo gestirà l'app sotto /prova/ quindi assicurati di avere un sistema di routing dentro lo scope /prova/ sulla tua app react):
```php
function react_route_manipolations() {
    $request_uri = $_SERVER['REQUEST_URI'];

    // Verifica se la richiesta è per "/prova/" o qualsiasi sotto-percorso
    if (strpos($request_uri, '/prova/') === 0) {
        include(get_template_directory() . '/page-prova.php');
        exit();
    }
}

add_action('template_redirect', 'react_route_manipolations');

function include_reactJS() {
    if (is_page('prova')) {
        // Includi il tuo file JavaScript solo per la pagina specifica
        // Questo file .js è quello che react genera dopo npm run build, andrà sostituito ogni deploy.
        wp_enqueue_script('react-js', get_template_directory_uri() . '/inc/assets/react-a/index-ZVg9j4fr.js', array('jquery'), null, true);
    }
}

add_action('wp_enqueue_scripts', 'include_reactJS');
```


## Installazione

Installa il progetto tramite npm

```bash
  cd react-app
  npm i
```
    
## Note sugli assets

Non sarà possibile utilizzare gli assets di react importati, questo accade perchè wordpress in esecuzione utilizza path diverse rispetto react, quindi parallelizzando i percorsi, avremo un maggior comfort per lo sviluppo, ma una restrizione di utilizzo per quanto riguarda l'import degli assets in src/, consiglio di spostare gli assets sulla public/ e creare un percorso parallelo a wordpress come in questo caso.

L'esempio a seguire, per tanto non funzionerà.

```javascript
import reactIcon from "../wp-content/themes/themebase/inc/assets/react-a/assets/react.svg";

function App() {
  <img src={reactIcon} alt="imported src">
}
```

Questo vale per ogni tipo di assets, che sia un video, un'immagine.
Soluzione temporanea ( pescando gli assets dalla public/ )
```javascript
import { assetsPath } from "../utils/constants";

function App() {
 <img src={`${assetsPath}/vite.svg`} alt="assets_public" />
}

//utils/constants
export const assetsPath = "/wp-content/themes/themebase/inc/assets/react-a/assets";
// themebase è il nome del tuo tema.

```
## Deploy
Deploy della tua app all'interno di una pagina wordpress

- Sul functions.php modifica il file .js con quello generato sulla dist/ di react.
```php
function include_reactJS() {
    if (is_page('prova')) {
        // Includi il tuo file JavaScript solo per la pagina specifica
        wp_enqueue_script('react-js', get_template_directory_uri() . '/inc/assets/react-a/index-ZVg9j4fr.js', array('jquery'), null, true);
    }
}
```
- Carichiamo sotto la directory react-a il file js (index-ZVg9j4fr.js)
🚀 La tua app è ufficialmente deployata.
## Future
- Auth collegata a wordpress headless.
- Plugin che semplifica alcuni passaggi precedenti.


## Autori

- [Ivan Liberato](https://github.com/Void061)

