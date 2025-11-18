import type { UserInstance } from "../../models/user";
import AuthSession from "../../utils/session";
import "../profileCalendar.scss";

type ProfileCardProps = {
    profile: UserInstance;
};

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const userName = profile?.name || "Kullanıcı";
  const email = profile?.email || AuthSession.getEmail();
  

  return (
    <div className="profile-section">
      <div className="profile-info">
        <h2 className="welcome-title">Hoş Geldiniz, {userName}</h2>

        <div className="profile-details">
          <p><strong>Email:</strong> {email}</p>
        
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

