// HabitVault JavaScript

// Daily Motivational Quotes
const quotes = [
    "Consistency is what transforms average into excellence.",
    "Small habits make big changes.",
    "Every day is a chance to improve.",
    "Motivation gets you started, habit keeps you going.",
    "Track it. Improve it. Own it.",
];

// Load or initialize habits in localStorage
let habits = JSON.parse(localStorage.getItem('habits')) || [];

// Store dark mode preference
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
const storedDarkMode = localStorage.getItem('darkMode') === 'true';

if (storedDarkMode) {
    body.classList.add('dark');
}

// Display daily motivational quote
function showDailyQuote() {
    const quoteEl = document.getElementById('dailyQuote');
    const dayIndex = new Date().getDate() % quotes.length;
    quoteEl.textContent = quotes[dayIndex];
}
showDailyQuote();

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('darkMode', body.classList.contains('dark'));
});

// Add habit form handling
const habitForm = document.getElementById('habitForm');
const habitsContainer = document.getElementById('habitsContainer');
const heatmapContainer = document.getElementById('heatmap');
const sortSelect = document.getElementById('sortSelect');

habitForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('habitName').value.trim();
    const targetDays = document.getElementById('targetDays').value;
    const startDate = document.getElementById('startDate').value;
    if (!name || !targetDays || !startDate) return;

    const newHabit = {
        id: Date.now(),
        name,
        targetDays,
        startDate,
        checkIns: {}, // { '2025-05-31': 'completed' }
        currentStreak: 0,
        longestStreak: 0,
    };
    habits.push(newHabit);
    saveHabits();
    renderHabits();
    habitForm.reset();
});

// Save habits to localStorage
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

// Calculate streaks
function calculateStreaks(habit) {
    const dates = Object.keys(habit.checkIns).sort();
    let currentStreak = 0;
    let longestStreak = 0;
    let prevDate = null;

    for (let date of dates) {
        if (habit.checkIns[date] !== 'completed') continue;
        if (!prevDate) {
            currentStreak = 1;
            longestStreak = 1;
        } else {
            const prev = new Date(prevDate);
            const curr = new Date(date);
            const diff = (curr - prev) / (1000 * 3600 * 24);
            if (diff === 1) {
                currentStreak++;
            } else if (diff > 1) {
                currentStreak = 1;
            }
            if (currentStreak > longestStreak) longestStreak = currentStreak;
        }
        prevDate = date;
    }
    habit.currentStreak = currentStreak;
    habit.longestStreak = longestStreak;
}

// Render habits
function renderHabits() {
    // Sort habits
    const sortBy = sortSelect.value;
    let sortedHabits = [...habits];
    if (sortBy === 'name') {
        sortedHabits.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'currentStreak') {
        sortedHabits.sort((a, b) => b.currentStreak - a.currentStreak);
    } else if (sortBy === 'longestStreak') {
        sortedHabits.sort((a, b) => b.longestStreak - a.longestStreak);
    }

    habitsContainer.innerHTML = '';
    if (sortedHabits.length === 0) {
        habitsContainer.innerHTML = '<p>No habits added yet. Start by adding one!</p>';
        heatmapContainer.innerHTML = '';
        return;
    }

    sortedHabits.forEach(habit => {
        calculateStreaks(habit);

        const card = document.createElement('div');
        card.className = 'habit-card';

        const title = document.createElement('h3');
        title.textContent = habit.name;
        card.appendChild(title);

        const info = document.createElement('p');
        info.className = 'habit-info';
        info.textContent = `Target: ${habit.targetDays.replace('everyday', 'Every Day').replace('weekdays', 'Weekdays').replace('custom', 'Custom Days')}, Start: ${habit.startDate}`;
        card.appendChild(info);

        // Check-in button
        const todayStr = new Date().toISOString().slice(0, 10);
        const status = habit.checkIns[todayStr];

        const checkInBtn = document.createElement('button');
        checkInBtn.className = 'check-in-btn';
        if (status === 'completed') {
            checkInBtn.textContent = 'Completed ✅';
            checkInBtn.classList.remove('missed');
        } else if (status === 'missed') {
            checkInBtn.textContent = 'Missed ❌';
            checkInBtn.classList.add('missed');
        } else {
            checkInBtn.textContent = 'Mark Completed';
            checkInBtn.classList.remove('missed');
        }

        checkInBtn.addEventListener('click', () => {
            if (habit.checkIns[todayStr] === 'completed') {
                habit.checkIns[todayStr] = 'missed';
            } else {
                habit.checkIns[todayStr] = 'completed';
            }
            saveHabits();
            renderHabits();
            renderHeatmap();
        });
        card.appendChild(checkInBtn);

        // Streak info
        const streak = document.createElement('p');
        streak.className = 'streak';
        streak.textContent = `Current Streak: ${habit.currentStreak} days | Longest: ${habit.longestStreak}`;
        card.appendChild(streak);

        // Edit and Delete buttons
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.title = 'Edit Habit';
        editBtn.innerHTML = '✏️';
        editBtn.addEventListener('click', () => editHabit(habit.id));
        card.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.title = 'Delete Habit';
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.addEventListener('click', () => {
            if (confirm(`Delete habit "${habit.name}"?`)) {
                habits = habits.filter(h => h.id !== habit.id);
                saveHabits();
                renderHabits();
                renderHeatmap();
            }
        });
        card.appendChild(deleteBtn);

        habitsContainer.appendChild(card);
    });
}

// Edit habit function
function editHabit(id) {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;
    const newName = prompt('Edit habit name:', habit.name);
    if (newName && newName.trim() !== '') {
        habit.name = newName.trim();
        saveHabits();
        renderHabits();
    }
}

// Render heatmap for all habits combined for past 30 days
function renderHeatmap() {
    heatmapContainer.innerHTML = '';
    if (habits.length === 0) return;

    // Combine all habit check-ins per date
    const combinedStatus = {};
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().slice(0, 10);
        combinedStatus[dateStr] = 'missed'; // default missed

        for (let habit of habits) {
            const status = habit.checkIns[dateStr];
            if (status === 'completed') {
                combinedStatus[dateStr] = 'completed';
                break; // if any habit completed this day, mark completed
            }
        }
    }
}