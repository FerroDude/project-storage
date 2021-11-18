import SettingsForm from '../components/SettingsForm';

const SettingsView = ({ onEditUser }) => {
  return (
    <div className="sign-up-view">
      <h1>Settings</h1>
      <SettingsForm onEditUser={onEditUser} />
    </div>
  );
};

export default SettingsView;
