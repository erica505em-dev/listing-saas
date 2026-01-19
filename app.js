const App = {
    init() {
        window.addEventListener('hashchange', () => this.route());
        this.route();
    },
    route() {
        const hash = window.location.hash.replace('#', '') || 'dashboard';
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const page = document.getElementById(`${hash}-page`);
        if (page) page.classList.add('active');
        if (hash === 'dashboard' && window.Dashboard) window.Dashboard.init();
    },
    generateListing() {
        if (!window.Storage.isPro() && window.Storage.getListingCount() >= 3) return window.showUpgradeModal();
        window.Storage.incrementListingCount();
        document.getElementById('generator-preview').innerHTML = '<h3>Listing Generated!</h3>';
        if (window.Dashboard) window.Dashboard.init();
    }
};
window.navigateTo = (h) => window.location.hash = h;
window.generateListing = () => App.generateListing();
document.addEventListener('DOMContentLoaded', () => App.init());
