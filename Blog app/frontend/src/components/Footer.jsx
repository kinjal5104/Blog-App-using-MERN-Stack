
import LinkedInIcon from '../assets/Linkedin_icon.svg';
const Footer = () => {
  return (
    <>
<footer>
  <style>{`
  footer {
    padding-top:5rem;
    width:100%;
    background-color:#ffffff ;
    font-family:Georgia, 'Times New Roman', Times, serif;
}

.footer_container{
    box-shadow: 0px -2px 8px rgba(0,0,0,0.7);
    /* border-top-right-radius: 4rem;
    border-top-left-radius: 4rem; */
    padding-top: 2rem;
    width: 100%;
    text-align: center;
    background-color: #f3c15e;
    background-color: linear ;
}

.footer_college h4{
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.footer_college h5{
    padding-top: 1rem;
}

.developers_details h4{
    padding-top: 1rem;
    font-size: 1.5rem;
}
.developers_details h3{
    font-size: 1.2rem;
}
.names{
    justify-content:space-evenly;
    width: 70%;
    margin: auto;
    display: flex;
}

.individual_name img{
    position: relative;
    width: 25%;
    height: 25%;
    transition: all ease 0.2s;
}

.individual_name img:hover{
    transform: translateY(-7px);
}
`}</style>
  <div class="footer_container">
    <div class="footer_college">
      <h4>K J Somaiya Institute of Technology</h4>
      <h5>Computer Engineering Department</h5>
      <h6>2023-24</h6>
    </div>
    <div class="developers_details">

      <h4><b>Guided By:</b></h4>
      <h3>Prof Pradnya Patil</h3>
      <h4><b>Developed By:</b></h4>
      <div class="names">
        <div class="individual_name">
          <h5>Kinjal Patel</h5>
          <a href="https://www.linkedin.com/in/kinjal-patel-bb441a279/" target="_blank">
          <img src={LinkedInIcon} alt="" class="linkedIn"></img>
        </a>
        </div>
        <div class="individual_name">
          <h5>Saniya Patil</h5>
          <a href="https://www.linkedin.com/in/saniya-patil-847b70287/" target="_blank">
          <img src={LinkedInIcon} alt="" class="linkedIn"></img></a>
        </div>
        <div class="individual_name">
          <h5>Mohit Patel</h5>
          <a href="https://www.linkedin.com/in/mohit-patel-5135552a3/" target="_blank">
          <img src={LinkedInIcon} alt="" class="linkedIn"></img>
        </a>
        </div>
        <div class="individual_name">
          <h5>Yash Ranbhare</h5>
          <a href="https://www.linkedin.com/in/yash-ranbhare-a3909724b/" target="_blank">
          <img src= {LinkedInIcon} alt="" class="linkedIn"></img>
        </a>

        </div>

      </div>
    </div>
  </div>
</footer>
    </>
    
  )
};

export default Footer