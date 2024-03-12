import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

import { fetchImages } from 'services/pixabay-api';

import css from './App.module.scss';

export const App = () => {
    // ================== STATE
    const [images, setImages] = useState([]);
    const [largeImage, setLargeImage] = useState('');
    const [term, setTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [showPageEnd, setShowPageEnd] = useState(false);
    // ================== /STATE

    useEffect(() => {
        Notiflix.Notify.init({
            width: '300px',
            timeout: 4000,
            fontSize: '16px',
            warning: {
                textColor: '#3f51b5',
            },
        });
        if (term !== '') {
            try {
                setIsLoading(true);
                fetchImages(term, pageNum).then(gallery => {
                    if (gallery.hits.length === 0) {
                        Notiflix.Notify.warning(
                            'Nothing found for your request'
                        );
                        return;
                    }
                    setImages(prevState => [...prevState, ...gallery.hits]);
                    setShowPageEnd(pageNum < Math.ceil(gallery.totalHits / 12));
                });
            } catch (error) {
                Notiflix.Notify.failure(
                    'Oops... Something went wrong please try again!'
                );
            } finally {
                setIsLoading(false);
            }
        }
    }, [term, pageNum]);

    // ================== LOGIC
    const handleSearcbarSubmit = term => {
        setTerm(term);
        setImages([]);
        setPageNum(1);
        setShowPageEnd(false);
    };

    const toggleModal = largeImage => {
        setShowModal(!showModal);
        setLargeImage(largeImage);
    };

    const onLoadMore = () => setPageNum(pageNum + 1);
    // ================== /LOGIC

    return (
        <div className={css.app}>
            <Searchbar onSubmit={handleSearcbarSubmit} />
            {images.length !== 0 && (
                <ImageGallery items={images} openModal={toggleModal} />
            )}
            {isLoading && <Loader />}

            {showPageEnd && <Button onClick={onLoadMore} />}

            {showModal && (
                <Modal onClose={toggleModal} largeImage={largeImage} />
            )}
        </div>
    );
};
