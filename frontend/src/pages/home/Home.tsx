import { useEffect, useState, useCallback, useRef } from "react";
import { Button, Card, Divider, message } from "antd";
import { Page } from "../../components/Page/Page";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './home.style.css';
import { PostEditor, RefPostEditor } from "../../components/PostEditor/PostEditor";
import { Post } from "../../entities/post";
import { PostService } from "../../services/post-service";
import { ProfilePost } from "../../components/ProfilePost/ProfilePost";
import { EventService } from "../../services/event-service";
import { Event } from "../../entities/event";
import { EventCard } from "../../components/EventCard/EventCard";
import { EventFormModal } from "../../components/FormModal/EventFormModal";
import { EventModal } from "../../components/EventModal/EventModal";


export function Home() {
	const refPostEditor = useRef<RefPostEditor | null>(null);
	const [posts, setPosts] = useState<Post[]>([]);
	const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(true);

	const [events, setEvents] = useState<Event[]>([]);
	const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(true);

	const [currentEvent, setCurrentEvent] = useState<Event | null>(null);


	const [isLoadingSendPost, setIsLoadingSendPost] = useState<boolean>(false);
	const [isOpenFormModalEvent, setIsOpenFormModalEvent] = useState<boolean>(false);

	const handleSendPostToServer = useCallback(async () => {
		try {
			setIsLoadingSendPost(true);
			const postText = refPostEditor.current?.getText() || "";

			const newPost = await PostService.add(postText);

			setPosts(prevPosts => [newPost, ...prevPosts]);

			refPostEditor.current?.clear();
			message.success("Post criado com sucesso!");
		} catch (error: any) {
			console.log(error)
			message.error("Não possivel carregar os Posts.");
		} finally {
			setIsLoadingSendPost(false);
		}
	}, []);

	useEffect(() => {
		async function getPosts() {
			try {
				setIsLoadingPosts(true);
				const posts = await PostService.getAllHomePosts();
				setPosts(posts);
			} catch (err) {
				message.error("Não possivel carregar os Posts.");
			} finally {
				setIsLoadingPosts(false);
			}
		}


		async function getEvents() {
			try {
				setIsLoadingEvents(true);
				const events = await EventService.getCloseEvents();
				setEvents(events);
			} catch (err) {
				console.log(err)
				message.error("Não possivel carregar os Events.");
			} finally {
				setIsLoadingEvents(false);
			}
		}

		getEvents();
		getPosts();
	}, []);

	const addEvent = useCallback((event: Event) => {
		setEvents(prevEvents => [event, ...prevEvents]);
	}, [])

	return (
		<Page>
			<div className="home_grid">
				<div className="le">
				</div>


				<div className="m">
					<Button
						onClick={handleSendPostToServer}
						disabled={isLoadingSendPost}
					>
						{isLoadingSendPost && <LoadingOutlined />} Criar Post
					</Button>
					<PostEditor ref={refPostEditor} />

					{isLoadingPosts && (
						<div>Loading...</div>
					)}

					{!isLoadingPosts && (
						<>
							{posts.map(post => (
								<ProfilePost
									key={post.id}
									post={post}
									profilePic={post.user.profilePic}
								/>
							))}
						</>
					)}


				</div>
				<div className="ld">
					<Card>
						<div className="card-eventos-header">
							<h2>Eventos</h2>
							<Button
								type="link"
								onClick={() => setIsOpenFormModalEvent(true)}
							>
								<PlusOutlined />
							</Button>
						</div>


						{isLoadingEvents && (
							<div>Loading...</div>
						)}

						{!isLoadingEvents && (
							<>
								{
									events.map(eventObj => (
										<button className="btn-event" key={eventObj.name} onClick={() => setCurrentEvent(eventObj)}>
											<EventCard event={eventObj} />
										</button>
									))
								}
							</>
						)}
					</Card>
				</div>
			</div>
			<EventFormModal
				isOpen={isOpenFormModalEvent}
				onClose={() => setIsOpenFormModalEvent(false)}
				onAlfterAddEvent={addEvent}
			/>

			<EventModal event={currentEvent} onClose={() => setCurrentEvent(null)} />
		</Page >
	)
}