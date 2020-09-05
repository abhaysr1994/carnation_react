/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from 'react';
import { getStory, getComments } from '../services/hnApi';
import {
  StoryWrapper,
  StoryTitle,
  StoryMeta,
  StoryMetaElement,
} from '../styles/StoryStyles';
import { mapTime } from '../mappers/mapTime';


export const Story = memo(function Story({ storyId }) {
  const [story, setStory] = useState({});
  const [comment, setComment] = useState({});


  function fRemove(id) {
    var elem = document.getElementById(id);
    elem.parentNode.removeChild(elem);
  }
  
  function fRead(id) {
    document.getElementById(id).style.backgroundColor = "lightblue";
  }

  useEffect(() => {
    getStory(storyId).then(data => data && data.url && setStory(data));
  }, []);

  useEffect(() => {
    getComments(storyId).then(data => data && data.url && setComment(data));
  }, []);


  return story && story.url ? (
    <StoryWrapper data-testid="story" id={storyId}>
      <StoryTitle>
      <p>{story.title}</p>  
      </StoryTitle>
      <StoryMeta>
        <span data-testid="story-by">
          <StoryMetaElement color="#000">By:</StoryMetaElement> {story.by}
        </span>
        <span data-testid="story-time">
          <StoryMetaElement color="#000">Posted:</StoryMetaElement> {` `}
          {mapTime(story.time)}
        </span>
      </StoryMeta>
      <br/>

      URL: <a href={story.url}>{story.url}</a>
      <br/>
      <br/>
      <button onClick={() => fRemove(storyId)}>Delete</button>  
      <button onClick={() => fRead(storyId)}>Mark Read</button>
    </StoryWrapper>
  ) : null;
});

