const Billing = {
    init() {
        const isPro = window.Storage.isPro();
        const btn = document.getElementById('upgrade-btn');
        if (btn) {
            btn.textContent = isPro ? 'Current Plan' : 'Upgrade to Pro';
            btn.disabled = isPro;
        }
    },
    showUpgradeModal() { document.getElementById('upgrade-modal').classList.remove('hidden'); },
    closeUpgradeModal() { document.getElementById('upgrade-modal').classList.add('hidden'); },
    processUpgrade() {
        window.Storage.savePlan('pro');
        this.init();
        this.closeUpgradeModal();
        if (window.Dashboard) window.Dashboard.init();
        alert('Upgraded to Pro!');
    }
};
window.showUpgradeModal = () => Billing.showUpgradeModal();
window.closeUpgradeModal = () => Billing.closeUpgradeModal();
window.processUpgrade = () => Billing.processUpgrade();
