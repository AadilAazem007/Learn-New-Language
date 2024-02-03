import axios from "axios";
import words from '../utils/words.json' assert { type: 'json' };
import { sampleSize, shuffle } from "lodash";


function generateRandomWord(length:number, words:string[]):string[] {
  let result = [];
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * 1000) + 1;
      result.push(words[randomIndex]);
  }
  return result;
}


const generateMCQ = (meaning:{Text:string}[], i:number): string[] => {
  const correctAns: string = meaning[i].Text

  //This is incorrect word array without including correct ans
  const allMeaningExceptForCorrect = meaning.filter((i)=>i.Text !== correctAns)

  //Three incorrect word array
  const incorrectOption:string[] = sampleSize(allMeaningExceptForCorrect, 3).map((i)=>i.Text)
  const mcqOption:string[] = shuffle([...incorrectOption,correctAns])
  return mcqOption
}

export const translateWord = async (langparams: LangType): Promise<WordType[]> => {
    try{
        const allWords = generateRandomWord(8, words).map((i) => ({
           Text: i
        }))
        
        const response = await axios.post("https://microsoft-translator-text.p.rapidapi.com/translate",allWords,{
            params: {
                'to[0]': langparams,
                'api-version': '3.0',
                profanityAction: 'NoAction',
                textType: 'plain'
              },
              headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '830cdeff3emshff5bd160ad38156p14867cjsn437eb4cab714',
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
              },
        })

        const receive:FetchedDataType[] = response.data
        const arr:WordType[] = receive.map((i,index) =>{
          const options = generateMCQ(allWords, index)
            return {
              word:i.translations[0].text,
              meaning: allWords[index].Text,
              options:options
            }
          }
        )
        return arr
    }
    catch(error)
    {
      console.log(error)
      throw new Error("Some Error")
    }
}

export const countMatchingElements = (arr1:string[], arr2: string[]): number => {

  if(arr1.length !== arr2.length) throw new Error("Array are not equal")

  let countVal=0

  for(let i=0; i < arr1.length; i++)
  {
    if(arr1[i] === arr2[i]) countVal++
  }

  return countVal
}