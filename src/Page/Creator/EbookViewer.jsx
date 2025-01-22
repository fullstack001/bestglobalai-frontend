import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ReactReader } from "react-reader";

import logo_icon from "../../assets/icons/logo.svg";

const apiPort = process.env.REACT_APP_API_PORT;

function EbookViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookUrl, setBookUrl] = useState("");
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [audioItems, setAudioItems] = useState([]);
  const [videoItems, setVideoItems] = useState([]);
  const [youtubeItems, setYoutubeItems] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [bookContents, setBookContents] = useState([]);
  const [bookType, setBookType] = useState("");

  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("en"); // Default language: English
  const [originalContent, setOriginalContent] = useState("");

  const renditionRef = useRef(null);

  const tabs = [
    { id: 0, label: "Audio" },
    { id: 1, label: "Video" },
    { id: 2, label: "YouTube" },
  ];

  const currentLocation = useLocation();
  const previousLocation = currentLocation.state?.previousUrl || "/";

  useEffect(() => {
    // Fetch the ebook file path from the backend
    const fetchEbookContent = async () => {
      try {
        const role = localStorage.getItem("role");
        const response = await axios.get(`${apiPort}/api/books/${id}`);
        const bookData = response.data.book;
        const ebookFileUrl = bookData.ebookFile;
        const watermarkFileUrl = bookData.watermarkFile;
        const bookContents = bookData.pages;

        setBookUrl(
          role === "user"
            ? `${apiPort}${watermarkFileUrl}`
            : `${apiPort}${ebookFileUrl}`
        );
        setTitle(bookData.title);
        setAuthor(bookData.author);
        setAudioItems(bookData.audioItems);
        setVideoItems(bookData.videoItems);
        setYoutubeItems(bookData.youtubeItems);
        setBookContents(bookContents);
        setBookType(bookData.bookType);
      } catch (error) {
        console.error("Error fetching ebook content:", error);
      }
    };

    fetchEbookContent();
  }, [id]);

  const translateContent = async (content) => {
    try {
      const response = await axios.post(`${apiPort}/api/translate/eBook`, {
        text: content,
        targetLanguage: language,
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Error translating content:", error);
    }
  };

  const handleTranslate = () => {
    if (originalContent) {
      translateContent(originalContent);
    }
  };

  const handleLocationChanged = async (epubcfi) => {
    setLocation(epubcfi);
    if (renditionRef.current) {
      try {
        const range = await renditionRef.current.getRange(epubcfi);
        const firstPart = range.commonAncestorContainer.baseURI.split(
          ".xhtml"
        )[0];
        const pageNumber = Number(firstPart.charAt(firstPart.length - 1));
        const pageContent = bookContents[pageNumber];
        setOriginalContent(pageContent.content);
        setTranslatedText(""); // Clear translated text when location changes
      } catch (error) {
        console.error(
          "Error fetching content for the current location:",
          error
        );
      }
    }
  };

  const returnBack = () => {
    navigate(previousLocation);
  };

  if (!bookUrl) {
    return <p>Loading ebook...</p>;
  }

  return (
    <div className="p-8 bg-gray-800 min-h-screen text-white">
      <div className="flex justify-between">
        <div>
          <img src={logo_icon} alt="logo_icon" className="w-[200px] mr-5" />
          <h2 className="text-2xl font-bold mb-4 mt-2">Ebook Viewer</h2>
        </div>
        <div>
          <button
            onClick={returnBack}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Back
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <div>
          <h2 className="text-xl mb-2">Title: {title}</h2>
          <h2 className="mb-2">Author: {author}</h2>
        </div>
        <div className="custom-tablist flex justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-all duration-300 ${
                selectedTab === tab.id
                  ? "bg-dashcolor text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div
            style={{ height: "600px", border: "1px solid #ddd" }}
            className="rounded-lg"
          >
            <ReactReader
              url={bookUrl}
              location={location}
              locationChanged={handleLocationChanged}
              getRendition={(rendition) => {
                renditionRef.current = rendition;
              }}
              epubOptions={{
                allowPopups: true,
                allowScriptedContent: true,
              }}
            />
          </div>

          {bookType === "created" ? (
            <div>
              {" "}
              <div className="mt-4">
                <select
                  className="bg-gray-700 text-white py-2 px-4 rounded-lg"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="ab">Abkhaz</option>
                  <option value="ace">Acehnese</option>
                  <option value="ach">Acholi</option>
                  <option value="aa">Afar</option>
                  <option value="af">Afrikaans</option>
                  <option value="sq">Albanian</option>
                  <option value="alz">Alur</option>
                  <option value="am">Amharic</option>
                  <option value="ar">Arabic</option>
                  <option value="hy">Armenian</option>
                  <option value="as">Assamese</option>
                  <option value="av">Avar</option>
                  <option value="awa">Awadhi</option>
                  <option value="ay">Aymara</option>
                  <option value="az">Azerbaijani</option>
                  <option value="ban">Balinese</option>
                  <option value="bal">Baluchi</option>
                  <option value="bm">Bambara</option>
                  <option value="bci">Baoulé</option>
                  <option value="ba">Bashkir</option>
                  <option value="eu">Basque</option>
                  <option value="btx">Batak Karo</option>
                  <option value="bts">Batak Simalungun</option>
                  <option value="bbc">Batak Toba</option>
                  <option value="be">Belarusian</option>
                  <option value="bem">Bemba</option>
                  <option value="bn">Bengali</option>
                  <option value="bew">Betawi</option>
                  <option value="bho">Bhojpuri</option>
                  <option value="bik">Bikol</option>
                  <option value="bs">Bosnian</option>
                  <option value="br">Breton</option>
                  <option value="bg">Bulgarian</option>
                  <option value="bua">Buryat</option>
                  <option value="yue">Cantonese</option>
                  <option value="ca">Catalan</option>
                  <option value="ceb">Cebuano</option>
                  <option value="ch">Chamorro</option>
                  <option value="ce">Chechen</option>
                  <option value="ny">Chichewa</option>
                  <option value="zh-CN">Chinese (Simplified)</option>
                  <option value="zh-TW">Chinese (Traditional)</option>
                  <option value="chk">Chuukese</option>
                  <option value="cv">Chuvash</option>
                  <option value="co">Corsican</option>
                  <option value="crh">Crimean Tatar (Cyrillic)</option>
                  <option value="crh-Latn">Crimean Tatar (Latin)</option>
                  <option value="hr">Croatian</option>
                  <option value="cs">Czech</option>
                  <option value="da">Danish</option>
                  <option value="fa-AF">Dari</option>
                  <option value="dv">Dhivehi</option>
                  <option value="din">Dinka</option>
                  <option value="doi">Dogri</option>
                  <option value="dov">Dombe</option>
                  <option value="nl">Dutch</option>
                  <option value="dyu">Dyula</option>
                  <option value="dz">Dzongkha</option>
                  <option value="en">English</option>
                  <option value="eo">Esperanto</option>
                  <option value="et">Estonian</option>
                  <option value="ee">Ewe</option>
                  <option value="fo">Faroese</option>
                  <option value="fj">Fijian</option>
                  <option value="tl">Filipino</option>
                  <option value="fi">Finnish</option>
                  <option value="fon">Fon</option>
                  <option value="fr">French</option>
                  <option value="fr-CA">French (Canada)</option>
                  <option value="fy">Frisian</option>
                  <option value="fur">Friulian</option>
                  <option value="ff">Fulani</option>
                  <option value="gaa">Ga</option>
                  <option value="gl">Galician</option>
                  <option value="ka">Georgian</option>
                  <option value="de">German</option>
                  <option value="el">Greek</option>
                  <option value="gn">Guarani</option>
                  <option value="gu">Gujarati</option>
                  <option value="ht">Haitian Creole</option>
                  <option value="cnh">Hakha Chin</option>
                  <option value="ha">Hausa</option>
                  <option value="haw">Hawaiian</option>
                  <option value="he">Hebrew</option>
                  <option value="iw">Hebrew</option>
                  <option value="hil">Hiligaynon</option>
                  <option value="hi">Hindi</option>
                  <option value="hmn">Hmong</option>
                  <option value="hu">Hungarian</option>
                  <option value="hrx">Hunsrik</option>
                  <option value="iba">Iban</option>
                  <option value="is">Icelandic</option>
                  <option value="ig">Igbo</option>
                  <option value="ilo">Ilocano</option>
                  <option value="id">Indonesian</option>
                  <option value="iu-Latn">Inuktut (Latin)</option>
                  <option value="iu">Inuktut (Syllabics)</option>
                  <option value="ga">Irish</option>
                  <option value="it">Italian</option>
                  <option value="jam">Jamaican Patois</option>
                  <option value="ja">Japanese</option>
                  <option value="jw">Javanese</option>
                  <option value="kac">Jingpo</option>
                  <option value="kl">Kalaallisut</option>
                  <option value="kn">Kannada</option>
                  <option value="kr">Kanuri</option>
                  <option value="pam">Kapampangan</option>
                  <option value="kk">Kazakh</option>
                  <option value="kha">Khasi</option>
                  <option value="km">Khmer</option>
                  <option value="cgg">Kiga</option>
                  <option value="kg">Kikongo</option>
                  <option value="rw">Kinyarwanda</option>
                  <option value="ktu">Kituba</option>
                  <option value="trp">Kokborok</option>
                  <option value="kv">Komi</option>
                  <option value="gom">Konkani</option>
                  <option value="ko">Korean</option>
                  <option value="kri">Krio</option>
                  <option value="ku">Kurdish (Kurmanji)</option>
                  <option value="ckb">Kurdish (Sorani)</option>
                  <option value="ky">Kyrgyz</option>
                  <option value="lo">Lao</option>
                  <option value="ltg">Latgalian</option>
                  <option value="la">Latin</option>
                  <option value="lv">Latvian</option>
                  <option value="lij">Ligurian</option>
                  <option value="li">Limburgish</option>
                  <option value="ln">Lingala</option>
                  <option value="lt">Lithuanian</option>
                  <option value="lmo">Lombard</option>
                  <option value="lg">Luganda</option>
                  <option value="luo">Luo</option>
                  <option value="lb">Luxembourgish</option>
                  <option value="mk">Macedonian</option>
                  <option value="mad">Madurese</option>
                  <option value="mai">Maithili</option>
                  <option value="mak">Makassar</option>
                  <option value="mg">Malagasy</option>
                  <option value="ms">Malay</option>
                  <option value="ms-Arab">Malay (Jawi)</option>
                  <option value="ml">Malayalam</option>
                  <option value="mt">Maltese</option>
                  <option value="mam">Mam</option>
                  <option value="gv">Manx</option>
                  <option value="mi">Maori</option>
                  <option value="mr">Marathi</option>
                  <option value="mh">Marshallese</option>
                  <option value="mwr">Marwadi</option>
                  <option value="mfe">Mauritian Creole</option>
                  <option value="chm">Meadow Mari</option>
                  <option value="mni-Mtei">Meiteilon (Manipuri)</option>
                  <option value="min">Minang</option>
                  <option value="lus">Mizo</option>
                  <option value="mn">Mongolian</option>
                  <option value="my">Myanmar (Burmese)</option>
                  <option value="nhe">Nahuatl (Eastern Huasteca)</option>
                  <option value="ndc-ZW">Ndau</option>
                  <option value="nr">Ndebele (South)</option>
                  <option value="new">Nepalbhasa (Newari)</option>
                  <option value="ne">Nepali</option>
                  <option value="bm-Nkoo">NKo</option>
                  <option value="no">Norwegian</option>
                  <option value="nus">Nuer</option>
                  <option value="oc">Occitan</option>
                  <option value="or">Odia (Oriya)</option>
                  <option value="om">Oromo</option>
                  <option value="os">Ossetian</option>
                  <option value="pag">Pangasinan</option>
                  <option value="pap">Papiamento</option>
                  <option value="ps">Pashto</option>
                  <option value="fa">Persian</option>
                  <option value="pl">Polish</option>
                  <option value="pt">Portuguese</option>
                  <option value="pt-BR">Portuguese (Brazil)</option>
                  <option value="pt-PT">Portuguese (Portugal)</option>
                  <option value="pa">Punjabi</option>
                  <option value="pa-Guru">Punjabi (Gurmukhi)</option>
                  <option value="pa-Arab">Punjabi (Shahmukhi)</option>
                  <option value="qu">Quechua</option>
                  <option value="kek">Qʼeqchiʼ</option>
                  <option value="rom">Romani</option>
                  <option value="ro">Romanian</option>
                  <option value="rn">Rundi</option>
                  <option value="ru">Russian</option>
                  <option value="se">Sami (North)</option>
                  <option value="sm">Samoan</option>
                  <option value="sg">Sango</option>
                  <option value="sa">Sanskrit</option>
                  <option value="sat-Latn">Santali (Latin)</option>
                  <option value="sat">Santali (Ol Chiki)</option>
                  <option value="gd">Scots Gaelic</option>
                  <option value="nso">Sepedi</option>
                  <option value="sr">Serbian</option>
                  <option value="st">Sesotho</option>
                  <option value="crs">Seychellois Creole</option>
                  <option value="shn">Shan</option>
                  <option value="sn">Shona</option>
                  <option value="scn">Sicilian</option>
                  <option value="szl">Silesian</option>
                  <option value="sd">Sindhi</option>
                  <option value="si">Sinhala</option>
                  <option value="sk">Slovak</option>
                  <option value="sl">Slovenian</option>
                  <option value="so">Somali</option>
                  <option value="es">Spanish</option>
                  <option value="su">Sundanese</option>
                  <option value="sus">Susu</option>
                  <option value="sw">Swahili</option>
                  <option value="ss">Swati</option>
                  <option value="sv">Swedish</option>
                  <option value="ty">Tahitian</option>
                  <option value="tg">Tajik</option>
                  <option value="ber-Latn">Tamazight</option>
                  <option value="ber">Tamazight (Tifinagh)</option>
                  <option value="ta">Tamil</option>
                  <option value="tt">Tatar</option>
                  <option value="te">Telugu</option>
                  <option value="tet">Tetum</option>
                  <option value="th">Thai</option>
                  <option value="bo">Tibetan</option>
                  <option value="ti">Tigrinya</option>
                  <option value="tiv">Tiv</option>
                  <option value="tpi">Tok Pisin</option>
                  <option value="to">Tongan</option>
                  <option value="lua">Tshiluba</option>
                  <option value="ts">Tsonga</option>
                  <option value="tn">Tswana</option>
                  <option value="tcy">Tulu</option>
                  <option value="tum">Tumbuka</option>
                  <option value="tr">Turkish</option>
                  <option value="tk">Turkmen</option>
                  <option value="tyv">Tuvan</option>
                  <option value="ak">Twi</option>
                  <option value="udm">Udmurt</option>
                  <option value="uk">Ukrainian</option>
                  <option value="ur">Urdu</option>
                  <option value="ug">Uyghur</option>
                  <option value="uz">Uzbek</option>
                  <option value="ve">Venda</option>
                  <option value="vec">Venetian</option>
                  <option value="vi">Vietnamese</option>
                  <option value="war">Waray</option>
                  <option value="cy">Welsh</option>
                  <option value="wo">Wolof</option>
                  <option value="xh">Xhosa</option>
                  <option value="sah">Yakut</option>
                  <option value="yi">Yiddish</option>
                  <option value="yo">Yoruba</option>
                  <option value="yua">Yucatec Maya</option>
                  <option value="zap">Zapotec</option>
                  <option value="zu">Zulu</option>
                </select>
                <button
                  onClick={handleTranslate}
                  className="bg-blue-500 text-white py-2 px-4 ml-2 rounded-lg"
                >
                  Translate
                </button>
              </div>
              <div className="mt-4 bg-gray-700 p-4 rounded-lg">
                <div
                  dangerouslySetInnerHTML={{
                    __html: translatedText || "No translation available.",
                  }}
                />
              </div>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          {selectedTab === 0 && (
            <div>
              {audioItems.map((item) => (
                <div key={item._id}>
                  <audio
                    className="w-full max-w-3xl mb-2 rounded-lg shadow-lg"
                    controls
                  >
                    <source
                      src={`${apiPort}${item.fileUrl}`}
                      type="audio/ogg"
                    />
                    <source
                      src={`${apiPort}${item.fileUrl}`}
                      type="audio/mp3"
                    />
                    Your browser does not support the audio element.
                  </audio>
                  <div className="mt-1 text-center mb-2">{item.title}</div>
                </div>
              ))}
            </div>
          )}
          {selectedTab === 1 && (
            <div>
              {videoItems.map((item) => (
                <div key={item._id}>
                  <video
                    className="w-full max-w-3xl mb-2 rounded-lg shadow-lg"
                    controls
                  >
                    <source
                      src={`${apiPort}${item.fileUrl}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video element.
                  </video>
                  <div className="mt-1 text-center mb-2">{item.title}</div>
                </div>
              ))}
            </div>
          )}
          {selectedTab === 2 && (
            <div>
              {youtubeItems.map((item) => (
                <div key={item._id}>
                  <iframe
                    className="w-full h-auto"
                    src={`${item.link}?autoplay=1`}
                    title="YouTube video player"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="mt-1 text-center mb-2">{item.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EbookViewer;
