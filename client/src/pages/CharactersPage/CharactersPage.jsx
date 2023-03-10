import axios from 'axios';
import {useEffect, useState} from 'react'; 
import './CharactersPage.scss'; 
import {Link } from 'react-router-dom'; 
import background from '../../assets/background.jpeg';

const CharactersPage = () => {
	const [data, setData] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		apiCharactersRequest(); 
	}, []); 

	const apiCharactersRequest = () => {
		const url = 'api/characters'
		axios.get(url)
		.then(response => setData(response.data.results))
		.catch(error => setError(error.message))
		
	}
	return (
	<div className='characters-page'>
		<img src={background} alt='star-wars background'/>
		<div className='characters'>
			<p>Characters</p>
			{ data && 
			data.map(character => (
					<ul>
						<li key={character.name}>
							<Link to={`/characters/${character.name}`}>
								{character.name}
							</Link>
						</li>
					</ul>
				)) 
			}
			{error && <p className='error'>{error}</p>}
		</div>
		</div>
	)

}

export default CharactersPage;