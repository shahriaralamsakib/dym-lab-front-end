import './style/ProfessorInfo.css'

function ProfessorInfo({ professor }) {
  if (!professor) return null

  return (
    <div className="professor-section" id="professor-info">
      <h2>Professor Information</h2>
      <div className="professor-container">
        <div className="professor-image-wrapper">
            {professor.image && (
            <img src={professor.image} alt="Professor" className="professor-image" />
            )}
        </div>
        <div className="professor-details">
            <p><strong>Name:</strong> {professor.name}</p>
            <p><strong>Email:</strong> {professor.email}</p>
            <p><strong>Bio:</strong> {professor.bio}</p>
        </div>
        </div>
    </div>
  )
}

export default ProfessorInfo
