const Auth = {
    init() {
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            window.Storage.saveSession({ email, name: email.split('@')[0] });
            this.checkSession();
        });
        document.getElementById('logout-btn').addEventListener('click', () => {
            window.Storage.clearSession();
            this.checkSession();
        });
        this.checkSession();
    },
    checkSession() {
        const session = window.Storage.getSession();
        document.getElementById('login-screen').classList.toggle('hidden', !!session);
        document.getElementById('app-shell').classList.toggle('hidden', !session);
        if (session) document.getElementById('user-name').textContent = session.name;
    }
};
document.addEventListener('DOMContentLoaded', () => Auth.init());
