import { Link } from "react-router-dom";
import teammates from "./data";
import s from "./OurTeam.module.css";

function OurTeam() {
	return (
		<div className={s.content}>
			<Link to='/' alt='homepage' className={s.close} />

			{teammates.map((teammate, idx) => (
				<figure key={idx} className={s.member}>
					<img src={teammate.photo} alt='' className={s.background} />
					<img
						src={teammate.photo}
						alt={teammate.fullName}
						className={s.profile}
					/>
					<figcaption>
						<h3>
							{teammate.fullName}
							<span>{teammate.position}</span>
						</h3>
						<div className={s.icons}>
							<a href={teammate.linkedIn}>
								<i className='ion-social-linkedin-outline'></i>
							</a>
							<a href={teammate.gitHub}>
								<i className='ion-social-github-outline'></i>
							</a>
						</div>
					</figcaption>
				</figure>
			))}
		</div>
	);
}

export default OurTeam;
