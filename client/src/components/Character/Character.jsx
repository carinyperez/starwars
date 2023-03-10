
import axios from 'axios';
import {useEffect, useState} from 'react'; 
import { useParams } from 'react-router-dom';
import Films from '../Films/Films';
import './Character.scss';


const Character = () => {

	const [data, setData] = useState('');
	const [image, setImage] = useState('')
	const [error, setError] = useState('');
	const {id}  = useParams(); 

	useEffect(() => {
		apiCharactersRequest(); 
		importImage(id)
	}, []); 

	const apiCharactersRequest = () => {
		const url = '/api/characters'
		axios.get(url)
		.then(response => setData(response.data.results.find(character => character.name === id)))
		.catch(error => setError(error.message))
	}

	const importImage = (id) => {
		import(`../../assets/${id.replace(/[^a-z0-9]/gi, '').toLowerCase()}.jpeg`).then(image => setImage(image.default));
	}
	
	return (
		<div>
			{data && 
			<div className='character'>
			<img src={image}></img>
			<div className='character-info'>
				<h1 >Name: {data.name}</h1>
				<p>Birth Year: {data.birth_year}</p>
				<p>Height: {data.height} cm</p>
				<p>Mass: {data.mass} kg</p>

				<div className='films'>
					<Films films={data.films}/>
				</div>
			</div>
			</div>
			}
			{
				error && <div className='error'>{error}</div>
			}
		</div>
	)	
}
export default Character; 