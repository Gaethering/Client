import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { postArticle } from '../../api/boardAPI';
import { PostArticleRequest } from '../../api/boardAPI.type';
import { useCategory } from '../../pages/Community';
import StyledButton from '../Form/Button.style';
import PicturesInput from './PicturesInput';

function PostEditer() {
  useEffect(() => {
    //! Mock API
    import('../../mocks/browser').then((msw) => {
      msw.worker.context.isMockingEnabled && msw.worker.stop();
    });
    ////
  }, []);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    register,
  } = useForm<PostArticleRequest>();

  const [images, setImages] = useState<File[]>([]);
  const {category} = useCategory();
  
  const { mutate, isLoading } = useMutation(postArticle, {
    retry: 5,
    retryDelay: 1000,
    onSuccess: (data) => console.log(data),
  });

  const onSubmit: SubmitHandler<PostArticleRequest> = async (data) => {
    setValue('categoryId', 1);
    console.log(data);

    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const formData = new FormData();

    images[0] ?? formData.append('images', new Blob());
    images.forEach((img) => formData.append('images', img));

    formData.append('data', blob);

    const res = mutate(formData);

    console.log('res', res);
  };
  return (
    <EditerOverlay>
      <StyledPostEditer onSubmit={handleSubmit(onSubmit)}>
        <TitleInput {...register('title')} placeholder="제목을 입력해주세요" />
        <ContentsInput
          {...register('content')}
          placeholder="내용을 입력해주세요"
        />
        <PicturesInput images={images} setImages={setImages} />
        <Submit type="submit" btnTheme="main">
          작성 완료 {isLoading && <span>{'Loading...'}</span>}
        </Submit>
      </StyledPostEditer>
    </EditerOverlay>
  );
}

export default PostEditer;

const EditerOverlay = styled.div`
  position: fixed;
  top: ${({ theme: { size } }) => size.navHeight};

  width: 80vw;
  height: 100%;
  background-color: ${({ theme: { color } }) => color.white};

  overflow-y: scroll;

  z-index: 100;
`;

const StyledPostEditer = styled.form`
  display: flex;
  flex-direction: column;
  margin: 4rem 1rem;
  padding: 2rem;

  border-radius: 1.6rem;
  background-color: ${({ theme: { color } }) => color.white};
  box-shadow: 0 0 1rem 0 rgba(100, 100, 100, 0.16);

  input,
  textarea {
    color: ${({ theme: { color } }) => color.black};
  }
`;

const TitleInput = styled.input`
  outline: none;

  height: 3rem;
  margin-bottom: 0.6rem;

  padding: 0.6rem 1.04rem;

  border-bottom: 0.1rem solid ${({ theme: { color } }) => color.gray2};

  font-size: 1.8rem;
  font-weight: 500;
`;

const ContentsInput = styled.textarea`
  resize: none;
  outline: none;

  height: 50vh;
  padding: 1rem;

  border: none;

  font-size: 1.6rem;
  font-weight: 400;
`;

const Submit = styled(StyledButton)`
  margin-top: 2rem;
  margin-bottom: 4rem;

  font-size: 1.8rem;
`;
