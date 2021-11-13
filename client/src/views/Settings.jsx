import SettingsForm from '../components/SettingsForm';

const SettingsView = ({ history, onEditUser }) => {
  return (
    <div className="sign-up-view">
      <h1>Settings</h1>
      <SettingsForm history={history} onEditUser={onEditUser} />
    </div>
  );
};

export default SettingsView;
