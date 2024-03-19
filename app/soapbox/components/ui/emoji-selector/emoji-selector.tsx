import classNames from 'classnames';
import React from 'react';

import { EmojiPickerModal } from 'soapbox/components/emoji_picker';
import { Emoji, HStack } from 'soapbox/components/ui';


interface IEmojiButton {
  /** Unicode emoji character. */
  emoji: string,
  /** Event handler when the emoji is clicked. */
  onClick: React.EventHandler<React.MouseEvent>,
  /** Extra class name on the <button> element. */
  className?: string,
  /** Tab order of the button. */
  tabIndex?: number,
}

/** Clickable emoji button that scales when hovered. */
const EmojiButton: React.FC<IEmojiButton> = ({ emoji, className, onClick, tabIndex }): JSX.Element => {
  return (
    <button className={classNames(className)} onClick={onClick} tabIndex={tabIndex}>
      <Emoji className='w-8 h-8 duration-100 hover:scale-125' emoji={emoji} />
    </button>
  );
};

interface IEmojiSelector {
  /** List of Unicode emoji characters. */
  emojis: Iterable<string>,
  /** Event handler when an emoji is clicked. */
  onReact: (emoji: string) => void,
  /** Whether the selector should be visible. */
  visible?: boolean,
  /** Whether the selector should be focused. */
  focused?: boolean,
}

/** Panel with a row of emoji buttons. */
const EmojiSelector: React.FC<IEmojiSelector> = ({ emojis, onReact, visible = false, focused = false }): JSX.Element => {
  const [modalActive, setModalActive] = React.useState(false);

  const handleReact = React.useCallback((emoji: string): React.EventHandler<React.MouseEvent> => {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      onReact(emoji);
    };
  }, [onReact]);

  const handleCustomReact: React.MouseEventHandler = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setModalActive(true);
  }, []);

  return (
    <>
      <HStack
        space={2}
        className={classNames('bg-white dark:bg-slate-900 p-3 rounded-full shadow-md z-[999] w-max')}
      >
        {Array.from(emojis).map((emoji, i) => (
          <EmojiButton
            key={i}
            emoji={emoji}
            onClick={handleReact(emoji)}
            tabIndex={(visible || focused) ? 0 : -1}
          />
        ))}
        <EmojiButton
          emoji={'🤯'}
          onClick={handleCustomReact}
          tabIndex={(visible || focused) ? 0 : -1}
        />
      </HStack>
      <EmojiPickerModal
        active={modalActive}
        onClose={() => setModalActive(false)}
        onPickEmoji={(e) => console.log(e)}
      />
    </>
  );
};

export default EmojiSelector;
