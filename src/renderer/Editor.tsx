import React, { useState } from 'react';
import { unified } from 'unified';
import retextEnglish from 'retext-english';
import { visit } from 'unist-util-visit';
import { u } from 'unist-builder';
import ContentEditable from 'react-contenteditable';
import './Editor.css';

//perhaps map all the sentences into a seperated funcional component, than change the color based on the words
//
interface SentenceConfig {
  words: string[];
}

const Sentence: React.FC<SentenceConfig> = ({ words }: SentenceConfig) => {
  console.log(words);
  var sentence: string = words.join('');
  return <span>{sentence}</span>;
};

const Editor: React.FC = () => {
  var [areaText, setAreaText] = useState('hello world');
  var [paragraph, setParagraph] = useState<any>();
  const processor = unified().use(retextEnglish);
  var [words, setWords] = useState<Array<string>>([]);

  const parse = (text: string) => {
    return processor.runSync(processor.parse(text));
  };

  //const highlight = (node) => {
  //

  //}

  // analyze the text with the parse, and use that to determine the highlighted color of the span
  // possibly map the sentence and pass down the info to another span componet and map it in the original edtor
  //
  // get a tree in a right state, at pass the information to a map of sentence spans
  const onChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    var textArea: string = ev.target.value;
    console.log(textArea);

    var tree = parse(textArea);
      console.log(tree);
      if(tree.children.length != 0) {
    visit(tree, 'ParagraphNode', (node) => {
        console.log(node);
      setParagraph(node);
    });
      }
      else {
        setParagraph([])
      }
    setAreaText(textArea);
    console.log(paragraph);
  };

    return (
      <div className="editor">
        <div className="draw" key="draw">
          {paragraph?.children?.map((node: any) => {
            console.log(node);
            if (node.type != 'WordNode') {
              return <Sentence words={[node.value]} />;
            }
            var arr = [];
            var sentenceWordLength: number = 0;
            if (node.children != null) {
              sentenceWordLength = node.children.length;
            }

            for (var i = 0; i < sentenceWordLength; i++) {
              if (node != null) {
                if (node.children[i].type == 'WordNode') {
                  arr.push(node.children[i].children[0].value);
                } else {
                  arr.push(node.children[i].value);
                    console.log(node.children[i].value);
                }
              }
            }
            return <Sentence words={arr} />;
          })}
        </div>
        <textarea value={areaText} onChange={onChange}></textarea>
      </div>
    );
};

export default Editor;
