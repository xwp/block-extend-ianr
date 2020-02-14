/**
 * The markup to be serialized back when a post is saved
 */
export default function edit() {
	return (
    <div className='c-block'>
      <h2>Can't edit me. But I can HMR like a boss in the editor only. Front end updates need page reload. Because HMR implementation is watching for React component updates but front end may NOT need to load React. Nor may it even load any JS into front end - just styles.</h2>
    </div>
	);
}