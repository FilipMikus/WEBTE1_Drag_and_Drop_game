const cache_container = "static_v2";
const files = [
    "index.html",
    "game_screen.html",
    "styles.css",
    "app.js",
    "levels.json",
    "media_files/backgrounds/louvre_interior_1.jpg",
    "media_files/backgrounds/louvre_interior_2.jpg",
    "media_files/backgrounds/louvre_interior_3.jpg",
    "media_files/backgrounds/louvre_interior_4.jpg",
    "media_files/backgrounds/louvre_interior_5.jpg",
    "media_files/backgrounds/start_louvre.mp4",
    "media_files/icons/favicon_black.ico",
    "media_files/icons/louvre_logo_black.png",
    "media_files/paints/astronomer.jpg",
    "media_files/paints/coronation_of_napoleon.jpg",
    "media_files/paints/dante_and_virgil_in_hell.jpg",
    "media_files/paints/david_with_the_head_of_goliath.jpg",
    "media_files/paints/death_of_the_virgin.jpg",
    "media_files/paints/diana_bathing.jpg",
    "media_files/paints/lacemaker.jpg",
    "media_files/paints/liberty_leading_the_people.jpg",
    "media_files/paints/man_with_a_glove.jpg",
    "media_files/paints/mona_lisa.jpg",
    "media_files/paints/philosopher_in_meditation.jpg",
    "media_files/paints/st_michael_overwhelming_the_demon.jpg",
    "media_files/paints/the_battles_of_the_granicus_river.jpg",
    "media_files/paints/the_raft_of_medusa.jpg",
    "media_files/paints/the_wedding_feast_at_cana.jpg"
];

//Kód zhotovený podľa vzoru z prednášky z dňa 26/10/2021:
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cache_container).then(cache => {
            return cache.addAll(files);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});