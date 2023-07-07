import "./classes/Member-cards.css"

function MemberCard({ name, position, photo, socialMedia }) {
  return (
    <div className="member-card">
      <h3>{name}</h3>
      <img src={photo} alt={name} className="member-photo"/>
      <p>{position}</p>
      <div className="social-media">
        {socialMedia &&
          socialMedia.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
          ))}
      </div>
    </div>
  );
}

export default MemberCard;
