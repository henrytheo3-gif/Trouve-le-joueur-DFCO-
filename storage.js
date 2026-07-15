/*=========================================
            STORAGE.JS
=========================================*/

const SAVE_KEY = "dfco-trouve-le-joueur-save";

// ================================
// Sauvegarde
// ================================

function saveProgress() {

    const save = {

        level: GameState.currentLevel

    };

    localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(save)
    );

}

// ================================
// Chargement
// ================================

function loadProgress() {

    const save =
        localStorage.getItem(SAVE_KEY);

    if (!save) return;

    try {

        const data = JSON.parse(save);

        if (typeof data.level === "number") {

            GameState.currentLevel = data.level;

        }

    } catch (e) {

        console.log("Sauvegarde invalide");

    }

}

// ================================
// Nouvelle partie
// ================================

function resetProgress() {

    localStorage.removeItem(SAVE_KEY);

    GameState.currentLevel = 0;

}

// ================================
// Progression
// ================================

function getProgress() {

    return {

        current: GameState.currentLevel + 1,

        total: players.length,

        percent: Math.round(

            ((GameState.currentLevel + 1) / players.length) * 100

        )

    };

}
