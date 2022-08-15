import React, { useState } from 'react';
import { useAuth } from '../context/auth.context';
import { updateTemplate } from '../utils/APIs';
import Button from './Button';

const MessageReplyInput = ({ defaultKeyword, defaultReply }) => {
  return (
    <div className='flex-h gap-2'>
      <label htmlFor='reply'>
        keyword
        <input
          defaultValue={defaultKeyword}
          name='keyword'
          placeholder='message keywords'
        />
      </label>

      <label htmlFor='reply'>
        reply message
        <input
          defaultValue={defaultReply}
          name='reply'
          placeholder='message reply'
        />
      </label>
    </div>
  );
};

const FORM_STATES = {
  NONE: 'NONE',
  SUBMITING: 'SUBMITING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const FEEDBACK_CONFIG = {
  ERROR: {
    style: {
      color: 'red',
      border: '1px solid red',
    },
    message: '❌ Something went wrong, please try again',
  },
  SUCCESS: {
    style: {
      color: 'green',
      border: '1px solid green',
    },

    message: '✅ Message reply updated successfully',
  },
};

const commonStyles = {
  marginTop: 8,
  borderRadius: 10,
  padding: 8,
};
export default function MessageRepliesFrom() {
  const { dbUser } = useAuth();
  const template = dbUser?.config?.template ?? { a: 1, b: 2, c: 3 }; // ex: {a:'1',b:'2'}
  // convert object to array so we can pass it to each input
  const keywords = Object.keys(template); // ['a','b']

  const [state, setState] = useState(FORM_STATES.NONE);
  const showFeedback =
    state === FORM_STATES.ERROR || state === FORM_STATES.SUCCESS;
  const onSubmit = async (e) => {
    e.preventDefault();
    setState(FORM_STATES.SUBMITING);

    const template = {
      [e.target[0].value]: e.target[1].value,
      [e.target[2].value]: e.target[3].value,
      [e.target[4].value]: e.target[5].value,
    };

    try {
      await updateTemplate(template);
      setState(FORM_STATES.SUCCESS);
      // clear success feedback after 2 seconds
      setTimeout(() => {
        setState(FORM_STATES.NONE);
      }, 2000);
    } catch (err) {
      console.log(err);
      setState(FORM_STATES.ERROR);
    }
  };

  return (
    <div>
      <div className='bg-accent box'>
        <h4>Customize message reply template</h4>
        <form onSubmit={onSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* ex: template {a:1} keywords ['a'] - keywords[0]='a' - template['a'] = 1 */}
            {keywords.map((key) => (
              <MessageReplyInput
                key={key}
                defaultKeyword={key}
                defaultReply={template[key]}
              />
            ))}
            <div className='mv-2'>
              <Button disabled={state === FORM_STATES.SUBMITING} type='submit'>
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </div>
      {showFeedback && (
        <div
          style={{
            ...FEEDBACK_CONFIG[state].style,
            ...commonStyles,
          }}
        >
          {FEEDBACK_CONFIG[state].message}
        </div>
      )}
    </div>
  );
}
