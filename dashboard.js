const Dashboard = {
    init() {
        const count = window.Storage.getListingCount();
        const plan = window.Storage.getPlan();
        document.querySelector('.stat-card .stat-value').textContent = count;
        document.getElementById('plan-display').textContent = plan.type.toUpperCase();
    }
};
window.Dashboard = Dashboard;
