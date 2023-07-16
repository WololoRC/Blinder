import "./classes/Member-cards.css"

function MemberCard({ name, position, photo, socialMedia }) {
  return (
    <div className="member-card">
      <img src={photo} alt={name} className="member-photo"/>
      <h3 className="member-name">{name}</h3>
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
