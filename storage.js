const Storage = {
    set(key, value) { localStorage.setItem(key, JSON.stringify(value)); },
    get(key) { const item = localStorage.getItem(key); return item ? JSON.parse(item) : null; },
    saveSession(userData) { this.set('lpg_session', userData); },
    getSession() { return this.get('lpg_session'); },
    clearSession() { localStorage.removeItem('lpg_session'); },
    savePlan(plan) { this.set('lpg_plan', { type: plan, updatedAt: new Date().toISOString() }); },
    getPlan() { return this.get('lpg_plan') || { type: 'free' }; },
    isPro() { return this.getPlan().type === 'pro'; },
    getListingCount() { return parseInt(localStorage.getItem('lpg_count') || '0'); },
    incrementListingCount() { localStorage.setItem('lpg_count', this.getListingCount() + 1); }
};
window.Storage = Storage;
