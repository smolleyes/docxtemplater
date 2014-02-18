(function(){var e,o,t;t="undefined"!=typeof global&&null!==global?global:window,o="undefined"!=typeof global&&null!==global?"node":"browser",t.docX={},t.docXData={},"node"===o&&(global.http=require("http"),global.https=require("https"),global.fs=require("fs"),global.vm=require("vm"),global.DOMParser=require("xmldom").DOMParser,global.XMLSerializer=require("xmldom").XMLSerializer,global.PNG=require("../../libs/pngjs/png-node"),global.url=require("url"),["grid.js","version.js","detector.js","formatinf.js","errorlevel.js","bitmat.js","datablock.js","bmparser.js","datamask.js","rsdecoder.js","gf256poly.js","gf256.js","decoder.js","qrcode.js","findpat.js","alignpat.js","databr.js"].forEach(function(e){return vm.runInThisContext(global.fs.readFileSync(__dirname+"/../../libs/jsqrcode/"+e),e)}),["jszip.js","jszip-load.js","jszip-deflate.js","jszip-inflate.js"].forEach(function(e){return vm.runInThisContext(global.fs.readFileSync(__dirname+"/../../libs/jszip/"+e),e)}),e=require("../../js/docxgen.js")),DocUtils.loadDoc("imageExample.docx"),DocUtils.loadDoc("tagExample.docx"),DocUtils.loadDoc("tagExampleExpected.docx"),DocUtils.loadDoc("tagLoopExample.docx"),DocUtils.loadDoc("tagLoopExampleImageExpected.docx"),DocUtils.loadDoc("tagProduitLoop.docx"),DocUtils.loadDoc("tagDashLoop.docx"),DocUtils.loadDoc("tagDashLoopList.docx"),DocUtils.loadDoc("tagDashLoopTable.docx"),DocUtils.loadDoc("tagIntelligentLoopTable.docx",{intelligentTagging:!0}),DocUtils.loadDoc("tagIntelligentLoopTableExpected.docx"),DocUtils.loadDoc("tagDashLoop.docx"),DocUtils.loadDoc("qrCodeExample.docx"),DocUtils.loadDoc("qrCodeExampleExpected.docx"),DocUtils.loadDoc("qrCodeTaggingExample.docx"),DocUtils.loadDoc("qrCodeTaggingExampleExpected.docx"),DocUtils.loadDoc("qrCodeTaggingLoopExample.docx"),DocUtils.loadDoc("qrCodeTaggingLoopExampleExpected.docx"),DocUtils.loadDoc("image.png",{docx:!1}),DocUtils.loadDoc("bootstrap_logo.png",{docx:!1}),DocUtils.loadDoc("BMW_logo.png",{docx:!1}),DocUtils.loadDoc("Firefox_logo.png",{docx:!1}),DocUtils.loadDoc("Volkswagen_logo.png",{docx:!1}),DocUtils.loadDoc("qrcodeTest.zip",{docx:!1}),describe("DocxGenBasis",function(){return it("should be defined",function(){return expect(e).not.toBe(void 0)}),it("should construct",function(){var o;return o=new e,expect(o).not.toBe(void 0)})}),describe("DocxGenLoading",function(){return describe("ajax done correctly",function(){return it("doc and img Data should have the expected length",function(){return expect(docXData["imageExample.docx"].length).toEqual(729580),expect(docXData["image.png"].length).toEqual(18062)}),it("should have the right number of files (the docx unzipped)",function(){return docX["imageExample.docx"]=new e(docXData["imageExample.docx"]),expect(DocUtils.sizeOfObject(docX["imageExample.docx"].zip.files)).toEqual(22)})}),describe("basic loading",function(){return it("should load file imageExample.docx",function(){return expect(typeof docX["imageExample.docx"]).toBe("object")})}),describe("content_loading",function(){return it("should load the right content for the footer",function(){var e;return e=docX["imageExample.docx"].getFullText("word/footer1.xml"),expect(e.length).not.toBe(0),expect(e).toBe("{last_name}{first_name}{phone}")}),it("should load the right content for the document",function(){var e;return e=docX["imageExample.docx"].getFullText(),expect(e).toBe("")})}),describe("image loading",function(){return it("should find one image (and not more than 1)",function(){return expect(docX["imageExample.docx"].getImageList().length).toEqual(1)}),it("should find the image named with the good name",function(){return expect(docX["imageExample.docx"].getImageList()[0].path).toEqual("word/media/image1.jpeg")}),it("should change the image with another one",function(){var e,o;return o=docX["imageExample.docx"].zip.files["word/media/image1.jpeg"].data,docX["imageExample.docx"].setImage("word/media/image1.jpeg",docXData["image.png"]),e=docX["imageExample.docx"].zip.files["word/media/image1.jpeg"].data,expect(o).not.toEqual(e),expect(docXData["image.png"]).toEqual(e)})})}),describe("DocxGenTemplating",function(){return describe("text templating",function(){return it("should change values with template vars",function(){var e;return e={first_name:"Hipp",last_name:"Edgar",phone:"0652455478",description:"New Website"},docX["tagExample.docx"].setTags(e),docX["tagExample.docx"].applyTags(),expect(docX["tagExample.docx"].getFullText()).toEqual("Edgar Hipp"),expect(docX["tagExample.docx"].getFullText("word/header1.xml")).toEqual("Edgar Hipp0652455478New Website"),expect(docX["tagExample.docx"].getFullText("word/footer1.xml")).toEqual("EdgarHipp0652455478")}),it("should export the good file",function(){var e,o;o=[];for(e in docX["tagExample.docx"].zip.files)expect(docX["tagExample.docx"].zip.files[e].options.date).not.toBe(docX["tagExampleExpected.docx"].zip.files[e].options.date),expect(docX["tagExample.docx"].zip.files[e].name).toBe(docX["tagExampleExpected.docx"].zip.files[e].name),expect(docX["tagExample.docx"].zip.files[e].options.base64).toBe(docX["tagExampleExpected.docx"].zip.files[e].options.base64),expect(docX["tagExample.docx"].zip.files[e].options.binary).toBe(docX["tagExampleExpected.docx"].zip.files[e].options.binary),expect(docX["tagExample.docx"].zip.files[e].options.compression).toBe(docX["tagExampleExpected.docx"].zip.files[e].options.compression),expect(docX["tagExample.docx"].zip.files[e].options.dir).toBe(docX["tagExampleExpected.docx"].zip.files[e].options.dir),o.push(expect(docX["tagExample.docx"].zip.files[e].data).toBe(docX["tagExampleExpected.docx"].zip.files[e].data));return o})})}),describe("DocxGenTemplatingForLoop",function(){return describe("textLoop templating",function(){return it("should replace all the tags",function(){var e;return e={nom:"Hipp",prenom:"Edgar",telephone:"0652455478",description:"New Website",offre:[{titre:"titre1",prix:"1250"},{titre:"titre2",prix:"2000"},{titre:"titre3",prix:"1400"}]},docX["tagLoopExample.docx"].setTags(e),docX["tagLoopExample.docx"].applyTags(),expect(docX["tagLoopExample.docx"].getFullText()).toEqual("Votre proposition commercialePrix: 1250Titre titre1Prix: 2000Titre titre2Prix: 1400Titre titre3HippEdgar")}),it("should work with loops inside loops",function(){var e,o,t;return e={products:[{title:"Microsoft",name:"DOS",reference:"Win7",avantages:[{title:"Everyone uses it",proof:[{reason:"it is quite cheap"},{reason:"it is quit simple"},{reason:"it works on a lot of different Hardware"}]}]},{title:"Linux",name:"Ubuntu",reference:"Ubuntu10",avantages:[{title:"It's very powerful",proof:[{reason:"the terminal is your friend"},{reason:"Hello world"},{reason:"it's free"}]}]},{title:"Apple",name:"Mac",reference:"OSX",avantages:[{title:"It's very easy",proof:[{reason:"you can do a lot just with the mouse"},{reason:"It's nicely designed"}]}]}]},docX["tagProduitLoop.docx"].setTags(e),docX["tagProduitLoop.docx"].applyTags(),t=docX["tagProduitLoop.docx"].getFullText(),o="MicrosoftProduct name : DOSProduct reference : Win7Everyone uses itProof that it works nicely : It works because it is quite cheap It works because it is quit simple It works because it works on a lot of different HardwareLinuxProduct name : UbuntuProduct reference : Ubuntu10It's very powerfulProof that it works nicely : It works because the terminal is your friend It works because Hello world It works because it's freeAppleProduct name : MacProduct reference : OSXIt's very easyProof that it works nicely : It works because you can do a lot just with the mouse It works because It's nicely designed",expect(t.length).toEqual(o.length),expect(t).toEqual(o)})})}),describe("Xml Util",function(){var e;return e=new XmlUtil,it("should compute the scope between 2 <w:t>",function(){var o;return o=e.getListXmlElements('undefined</w:t></w:r></w:p><w:p w:rsidP="008A4B3C" w:rsidR="007929C1" w:rsidRDefault="007929C1" w:rsidRPr="008A4B3C"><w:pPr><w:pStyle w:val="Sous-titre"/></w:pPr><w:r w:rsidRPr="008A4B3C"><w:t xml:space="preserve">Audit réalisé le '),expect(o).toEqual([{tag:"</w:t>",offset:9},{tag:"</w:r>",offset:15},{tag:"</w:p>",offset:21},{tag:"<w:p>",offset:27},{tag:"<w:r>",offset:162},{tag:"<w:t>",offset:188}])}),it("should compute the scope between 2 <w:t> in an Array",function(){var o;return o=e.getListXmlElements('urs</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:type="dxa" w:w="4140"/></w:tcPr><w:p w:rsidP="00CE524B" w:rsidR="00CE524B" w:rsidRDefault="00CE524B"><w:pPr><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:color w:val="auto"/></w:rPr></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:color w:val="auto"/></w:rPr><w:t>Sur exté'),expect(o).toEqual([{tag:"</w:t>",offset:3},{tag:"</w:r>",offset:9},{tag:"</w:p>",offset:15},{tag:"</w:tc>",offset:21},{tag:"<w:tc>",offset:28},{tag:"<w:p>",offset:83},{tag:"<w:r>",offset:268},{tag:"<w:t>",offset:374}])}),it("should compute the scope between a w:t in an array and the other outside",function(){var o;return o=e.getListXmlElements('defined </w:t></w:r></w:p></w:tc></w:tr></w:tbl><w:p w:rsidP="00CA7135" w:rsidR="00BE3585" w:rsidRDefault="00BE3585"/><w:p w:rsidP="00CA7135" w:rsidR="00BE3585" w:rsidRDefault="00BE3585"/><w:p w:rsidP="00CA7135" w:rsidR="00137C91" w:rsidRDefault="00137C91"><w:r w:rsidRPr="00B12C70"><w:rPr><w:bCs/></w:rPr><w:t>Coût ressources '),expect(o).toEqual([{tag:"</w:t>",offset:8},{tag:"</w:r>",offset:14},{tag:"</w:p>",offset:20},{tag:"</w:tc>",offset:26},{tag:"</w:tr>",offset:33},{tag:"</w:tbl>",offset:40},{tag:"<w:p>",offset:188},{tag:"<w:r>",offset:257},{tag:"<w:t>",offset:306}])})}),describe("scope diff calculation",function(){var e;return e=new XmlUtil,it("should compute the scopeDiff between 2 <w:t>",function(){var o;return o=e.getListDifferenceXmlElements('undefined</w:t></w:r></w:p><w:p w:rsidP="008A4B3C" w:rsidR="007929C1" w:rsidRDefault="007929C1" w:rsidRPr="008A4B3C"><w:pPr><w:pStyle w:val="Sous-titre"/></w:pPr><w:r w:rsidRPr="008A4B3C"><w:t xml:space="preserve">Audit réalisé le '),expect(o).toEqual([])}),it("should compute the scopeDiff between 2 <w:t> in an Array",function(){var o;return o=e.getListDifferenceXmlElements('urs</w:t></w:r></w:p></w:tc><w:tc><w:tcPr><w:tcW w:type="dxa" w:w="4140"/></w:tcPr><w:p w:rsidP="00CE524B" w:rsidR="00CE524B" w:rsidRDefault="00CE524B"><w:pPr><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:color w:val="auto"/></w:rPr></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:color w:val="auto"/></w:rPr><w:t>Sur exté'),expect(o).toEqual([])}),it("should compute the scopeDiff between a w:t in an array and the other outside",function(){var o;return o=e.getListDifferenceXmlElements('defined </w:t></w:r></w:p></w:tc></w:tr></w:tbl><w:p w:rsidP="00CA7135" w:rsidR="00BE3585" w:rsidRDefault="00BE3585"/><w:p w:rsidP="00CA7135" w:rsidR="00BE3585" w:rsidRDefault="00BE3585"/><w:p w:rsidP="00CA7135" w:rsidR="00137C91" w:rsidRDefault="00137C91"><w:r w:rsidRPr="00B12C70"><w:rPr><w:bCs/></w:rPr><w:t>Coût ressources '),expect(o).toEqual([{tag:"</w:tc>",offset:26},{tag:"</w:tr>",offset:33},{tag:"</w:tbl>",offset:40}])})}),describe("scope inner text",function(){return it("should find the scope",function(){var o,t,a;return a=new DocXTemplater,docX["tagProduitLoop.docx"]=new e(docXData["tagProduitLoop.docx"]),t=a.calcOuterXml(docX["tagProduitLoop.docx"].zip.files["word/document.xml"].data,1195,1245,"w:p"),o={text:'<w:p w:rsidR="00923B77" w:rsidRDefault="00923B77"><w:r><w:t>{#</w:t></w:r><w:r w:rsidR="00713414"><w:t>products</w:t></w:r><w:r><w:t>}</w:t></w:r></w:p>',startTag:1134,endTag:1286},expect(t.endTag).toEqual(o.endTag),expect(t.startTag).toEqual(o.startTag),expect(t.text.length).toEqual(o.text.length),expect(t.text).toEqual(o.text)})}),describe("Dash Loop Testing",function(){return it("dash loop ok on simple table -> w:tr",function(){var e,o,t;return e={os:[{type:"linux",price:"0",reference:"Ubuntu10"},{type:"DOS",price:"500",reference:"Win7"},{type:"apple",price:"1200",reference:"MACOSX"}]},docX["tagDashLoop.docx"].setTags(e),docX["tagDashLoop.docx"].applyTags(),o="linux0Ubuntu10DOS500Win7apple1200MACOSX",t=docX["tagDashLoop.docx"].getFullText(),expect(t).toBe(o)}),it("dash loop ok on simple table -> w:table",function(){var e,o,t;return e={os:[{type:"linux",price:"0",reference:"Ubuntu10"},{type:"DOS",price:"500",reference:"Win7"},{type:"apple",price:"1200",reference:"MACOSX"}]},docX["tagDashLoopTable.docx"].setTags(e),docX["tagDashLoopTable.docx"].applyTags(),o="linux0Ubuntu10DOS500Win7apple1200MACOSX",t=docX["tagDashLoopTable.docx"].getFullText(),expect(t).toBe(o)}),it("dash loop ok on simple list -> w:p",function(){var e,o,t;return e={os:[{type:"linux",price:"0",reference:"Ubuntu10"},{type:"DOS",price:"500",reference:"Win7"},{type:"apple",price:"1200",reference:"MACOSX"}]},docX["tagDashLoopList.docx"].setTags(e),docX["tagDashLoopList.docx"].applyTags(),o="linux 0 Ubuntu10 DOS 500 Win7 apple 1200 MACOSX ",t=docX["tagDashLoopList.docx"].getFullText(),expect(t).toBe(o)})}),describe("Intelligent Loop Tagging",function(){return it("should work with tables",function(){var e,o,t,a,i;e={clients:[{first_name:"John",last_name:"Doe",phone:"+33647874513"},{first_name:"Jane",last_name:"Doe",phone:"+33454540124"},{first_name:"Phil",last_name:"Kiel",phone:"+44578451245"},{first_name:"Dave",last_name:"Sto",phone:"+44548787984"}]},docX["tagIntelligentLoopTable.docx"].setTags(e),docX["tagIntelligentLoopTable.docx"].applyTags(),o="JohnDoe+33647874513JaneDoe+33454540124PhilKiel+44578451245DaveSto+44548787984",a=docX["tagIntelligentLoopTableExpected.docx"].getFullText(),expect(a).toBe(o),i=[];for(t in docX["tagIntelligentLoopTable.docx"].zip.files)expect(docX["tagIntelligentLoopTable.docx"].zip.files[t].data).toBe(docX["tagIntelligentLoopTableExpected.docx"].zip.files[t].data),expect(docX["tagIntelligentLoopTable.docx"].zip.files[t].name).toBe(docX["tagIntelligentLoopTableExpected.docx"].zip.files[t].name),expect(docX["tagIntelligentLoopTable.docx"].zip.files[t].options.base64).toBe(docX["tagIntelligentLoopTableExpected.docx"].zip.files[t].options.base64),expect(docX["tagIntelligentLoopTable.docx"].zip.files[t].options.binary).toBe(docX["tagIntelligentLoopTableExpected.docx"].zip.files[t].options.binary),expect(docX["tagIntelligentLoopTable.docx"].zip.files[t].options.compression).toBe(docX["tagIntelligentLoopTableExpected.docx"].zip.files[t].options.compression),expect(docX["tagIntelligentLoopTable.docx"].zip.files[t].options.dir).toBe(docX["tagIntelligentLoopTableExpected.docx"].zip.files[t].options.dir),i.push(expect(docX["tagIntelligentLoopTable.docx"].zip.files[t].options.date).not.toBe(docX["tagIntelligentLoopTableExpected.docx"].zip.files[t].options.date));return i})}),describe("getTags",function(){return it("should work with simple document",function(){var o;return docX["tagExample.docx"]=new e(docXData["tagExample.docx"],{},!1),o=docX["tagExample.docx"].getTags(),expect(o).toEqual([{fileName:"word/document.xml",vars:{last_name:!0,first_name:!0}},{fileName:"word/footer1.xml",vars:{last_name:!0,first_name:!0,phone:!0}},{fileName:"word/header1.xml",vars:{last_name:!0,first_name:!0,phone:!0,description:!0}}])}),it("should work with loop document",function(){var o;return docX["tagLoopExample.docx"]=new e(docXData["tagLoopExample.docx"],{},!1),o=docX["tagLoopExample.docx"].getTags(),expect(o).toEqual([{fileName:"word/document.xml",vars:{offre:{prix:!0,titre:!0},nom:!0,prenom:!0}},{fileName:"word/footer1.xml",vars:{nom:!0,prenom:!0,telephone:!0}},{fileName:"word/header1.xml",vars:{nom:!0,prenom:!0}}])}),it("should work if there are no Tags",function(){var o;return docX["qrCodeExample.docx"]=new e(docXData["qrCodeExample.docx"],{},!1),o=docX["qrCodeExample.docx"].getTags(),expect(o).toEqual([])})}),describe("xmlTemplater",function(){return it("should work with simpleContent",function(){var e,o,t;return e="<w:t>Hello {name}</w:t>",o={name:"Edgar"},t=new DocXTemplater(e,{Tags:o}),t.applyTags(),expect(t.getFullText()).toBe("Hello Edgar")}),it("should work with non w:t content",function(){var e,o,t;return e="{image}.png",o={image:"edgar"},t=new DocXTemplater(e,{Tags:o}),t.applyTags(),expect(t.content).toBe("edgar.png")}),it("should work with tag in two elements",function(){var e,o,t;return e="<w:t>Hello {</w:t><w:t>name}</w:t>",o={name:"Edgar"},t=new DocXTemplater(e,{Tags:o}),t.applyTags(),expect(t.getFullText()).toBe("Hello Edgar")}),it("should work with simple Loop",function(){var e,o,t;return e="<w:t>Hello {#names}{name},{/names}</w:t>",o={names:[{name:"Edgar"},{name:"Mary"},{name:"John"}]},t=new DocXTemplater(e,{Tags:o}),t.applyTags(),expect(t.getFullText()).toBe("Hello Edgar,Mary,John,")}),it("should work with dash Loop",function(){var e,o,t;return e="<w:p><w:t>Hello {-w:p names}{name},{/names}</w:t></w:p>",o={names:[{name:"Edgar"},{name:"Mary"},{name:"John"}]},t=new DocXTemplater(e,{Tags:o}),t.applyTags(),expect(t.getFullText()).toBe("Hello Edgar,Hello Mary,Hello John,")}),it("should work with loop and innerContent",function(){var e,o,t;return e='</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRDefault="00713414" w:rsidP="00923B77"><w:pPr><w:pStyle w:val="Titre1"/></w:pPr><w:r><w:t>{title</w:t></w:r><w:r w:rsidR="00923B77"><w:t>}</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRPr="00923B77" w:rsidRDefault="00713414" w:rsidP="00923B77"><w:r><w:t>Proof that it works nicely :</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRDefault="00923B77" w:rsidP="00923B77"><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr><w:r><w:t>{#pr</w:t></w:r><w:r w:rsidR="00713414"><w:t>oof</w:t></w:r><w:r><w:t xml:space="preserve">} </w:t></w:r><w:r w:rsidR="00713414"><w:t>It works because</w:t></w:r><w:r><w:t xml:space="preserve"> {</w:t></w:r><w:r w:rsidR="006F26AC"><w:t>reason</w:t></w:r><w:r><w:t>}</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRDefault="00713414" w:rsidP="00923B77"><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr><w:r><w:t>{/proof</w:t></w:r><w:r w:rsidR="00923B77"><w:t>}</w:t></w:r></w:p><w:p w:rsidR="00FD04E9" w:rsidRDefault="00923B77"><w:r><w:t>',o={title:"Everyone uses it",proof:[{reason:"it is quite cheap"},{reason:"it is quit simple"},{reason:"it works on a lot of different Hardware"}]},t=new DocXTemplater(e,{Tags:o}),t.applyTags(),expect(t.getFullText()).toBe("Everyone uses itProof that it works nicely : It works because it is quite cheap It works because it is quit simple It works because it works on a lot of different Hardware")}),it("should work with loop and innerContent (with last)",function(){var e,o,t;return e='</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRDefault="00713414" w:rsidP="00923B77"><w:pPr><w:pStyle w:val="Titre1"/></w:pPr><w:r><w:t>{title</w:t></w:r><w:r w:rsidR="00923B77"><w:t>}</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRPr="00923B77" w:rsidRDefault="00713414" w:rsidP="00923B77"><w:r><w:t>Proof that it works nicely :</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRDefault="00923B77" w:rsidP="00923B77"><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr><w:r><w:t>{#pr</w:t></w:r><w:r w:rsidR="00713414"><w:t>oof</w:t></w:r><w:r><w:t xml:space="preserve">} </w:t></w:r><w:r w:rsidR="00713414"><w:t>It works because</w:t></w:r><w:r><w:t xml:space="preserve"> {</w:t></w:r><w:r w:rsidR="006F26AC"><w:t>reason</w:t></w:r><w:r><w:t>}</w:t></w:r></w:p><w:p w:rsidR="00923B77" w:rsidRDefault="00713414" w:rsidP="00923B77"><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr><w:r><w:t>{/proof</w:t></w:r><w:r w:rsidR="00923B77"><w:t>}</w:t></w:r></w:p><w:p w:rsidR="00FD04E9" w:rsidRDefault="00923B77"><w:r><w:t> ',o={title:"Everyone uses it",proof:[{reason:"it is quite cheap"},{reason:"it is quit simple"},{reason:"it works on a lot of different Hardware"}]},t=new DocXTemplater(e,{Tags:o}),t.applyTags(),expect(t.getFullText()).toBe("Everyone uses itProof that it works nicely : It works because it is quite cheap It works because it is quit simple It works because it works on a lot of different Hardware")}),it("should work with not w:t tag (if the for loop is like {#forloop} text {/forloop}) ",function(){var e,o,t;return e="Hello {#names}{name},{/names}",o={names:[{name:"Edgar"},{name:"Mary"},{name:"John"}]},t=new DocXTemplater(e,{Tags:o}),t.applyTags(),expect(t.content).toBe("Hello Edgar,Mary,John,")})}),describe("DocxQrCode module",function(){return describe("Calculate simple Docx",function(){var t,a,i,r;return t=null,a=null,r=null,i=null,beforeEach(function(){var o;return r=new JSZip(docXData["qrcodeTest.zip"]),o=new e,i=new DocXTemplater("",{DocxGen:o,Tags:{Tag:"tagValue"}})}),it("should work with Blablalalabioeajbiojbepbroji",function(){return runs(function(){var e,n,l,c,d,p;return a=!1,t={test:function(){return a=!0}},spyOn(t,"test").andCallThrough(),"browser"===o?(p=new DocxQrCode(r.files["blabla.png"].data,i,"custom.png",6),p.decode(t.test)):(e=JSZipBase64.encode(r.files["blabla.png"].data),n=new Buffer(e,"base64"),d=new PNG(n),c=function(e){return d.decoded=e,p=new DocxQrCode(d,i,"custom.png",6),p.decode(t.test)},l=d.decode(c))}),waitsFor(function(){return a}),runs(function(){return expect(t.test).toHaveBeenCalled(),expect(t.test.calls.length).toEqual(1),expect(t.test.mostRecentCall.args[0].result).toEqual("Blablalalabioeajbiojbepbroji"),expect(t.test.mostRecentCall.args[1]).toEqual("custom.png"),expect(t.test.mostRecentCall.args[2]).toEqual(6)})}),it("should work with long texts",function(){return runs(function(){var e,n,l,c,d,p;return a=!1,t={test:function(){return a=!0}},spyOn(t,"test").andCallThrough(),"browser"===o?(p=new DocxQrCode(r.files["custom.png"].data,i,"custom.png",6),p.decode(t.test)):(e=JSZipBase64.encode(r.files["custom.png"].data),n=new Buffer(e,"base64"),d=new PNG(n),c=function(e){return d.decoded=e,p=new DocxQrCode(d,i,"custom.png",6),p.decode(t.test)},l=d.decode(c))}),waitsFor(function(){return a}),runs(function(){return expect(t.test).toHaveBeenCalled(),expect(t.test.calls.length).toEqual(1),expect(t.test.mostRecentCall.args[0].result).toEqual("Some custom text"),expect(t.test.mostRecentCall.args[1]).toEqual("custom.png"),expect(t.test.mostRecentCall.args[2]).toEqual(6)})}),it("should work with basic image",function(){return runs(function(){var e,n,l,c,d,p;return a=!1,t={test:function(){return a=!0}},spyOn(t,"test").andCallThrough(),"browser"===o?(p=new DocxQrCode(r.files["qrcodeTest.png"].data,i,"qrcodeTest.png",4),p.decode(t.test)):(e=JSZipBase64.encode(r.files["qrcodeTest.png"].data),n=new Buffer(e,"base64"),d=new PNG(n),c=function(e){return d.decoded=e,p=new DocxQrCode(d,i,"qrcodeTest.png",4),p.decode(t.test)},l=d.decode(c))}),waitsFor(function(){return a}),runs(function(){return expect(t.test).toHaveBeenCalled(),expect(t.test.calls.length).toEqual(1),expect(t.test.mostRecentCall.args[0].result).toEqual("test"),expect(t.test.mostRecentCall.args[1]).toEqual("qrcodeTest.png"),expect(t.test.mostRecentCall.args[2]).toEqual(4)})}),it("should work with image with {tags}",function(){return runs(function(){var e,n,l,c,d,p;return a=!1,t={test:function(){return a=!0}},spyOn(t,"test").andCallThrough(),"browser"===o?(p=new DocxQrCode(r.files["qrcodetag.png"].data,i,"tag.png",2),p.decode(t.test)):(e=JSZipBase64.encode(r.files["qrcodetag.png"].data),n=new Buffer(e,"base64"),d=new PNG(n),c=function(e){return d.decoded=e,p=new DocxQrCode(d,i,"tag.png",2),p.decode(t.test)},l=d.decode(c))}),waitsFor(function(){return a}),runs(function(){return expect(t.test).toHaveBeenCalled(),expect(t.test.calls.length).toEqual(1),expect(t.test.mostRecentCall.args[0].result).toEqual("tagValue"),expect(t.test.mostRecentCall.args[1]).toEqual("tag.png"),expect(t.test.mostRecentCall.args[2]).toEqual(2)})})})}),describe("image Loop Replacing",function(){return describe("rels",function(){return it("should load",function(){return expect(docX["imageExample.docx"].imgManager.loadImageRels().imageRels).toEqual([]),expect(docX["imageExample.docx"].imgManager.maxRid).toEqual(10)}),it("should add",function(){var e,o,t,a,i,r,n;return a=docX["imageExample.docx"].zip.files["word/_rels/document.xml.rels"].data,expect(docX["imageExample.docx"].imgManager.addImageRels("image1.png",docXData["bootstrap_logo.png"])).toBe(11),expect(docX["imageExample.docx"].zip.files["word/_rels/document.xml.rels"].data).not.toBe(a),r=docX["imageExample.docx"].zip.files["word/_rels/document.xml.rels"].data,e=docX["imageExample.docx"].zip.files["[Content_Types].xml"].data,n=DocUtils.Str2xml(r),o=DocUtils.Str2xml(e),i=n.getElementsByTagName("Relationship"),t=o.getElementsByTagName("Default"),expect(i.length).toEqual(11),expect(t.length).toBe(4)})})}),describe("loop forTagging images",function(){return it("should work with a simple loop file",function(){var t,a,i,r,n,l,c,d,p;docX["tagLoopExample.docx"]=new e(docXData["tagLoopExample.docx"]),d={nom:"Hipp",prenom:"Edgar",telephone:"0652455478",description:"New Website",offre:[{titre:"titre1",prix:"1250",img:[{data:docXData["Volkswagen_logo.png"],name:"vw_logo.png"}]},{titre:"titre2",prix:"2000",img:[{data:docXData["BMW_logo.png"],name:"bmw_logo.png"}]},{titre:"titre3",prix:"1400",img:[{data:docXData["Firefox_logo.png"],name:"firefox_logo.png"}]}]},docX["tagLoopExample.docx"].setTags(d),docX["tagLoopExample.docx"].applyTags();for(r in docX["tagLoopExample.docx"].zip.files)expect(docX["tagLoopExample.docx"].zip.files[r].options.date).not.toBe(docX["tagLoopExampleImageExpected.docx"].zip.files[r].options.date),expect(docX["tagLoopExample.docx"].zip.files[r].name).toBe(docX["tagLoopExampleImageExpected.docx"].zip.files[r].name),expect(docX["tagLoopExample.docx"].zip.files[r].options.base64).toBe(docX["tagLoopExampleImageExpected.docx"].zip.files[r].options.base64),expect(docX["tagLoopExample.docx"].zip.files[r].options.binary).toBe(docX["tagLoopExampleImageExpected.docx"].zip.files[r].options.binary),expect(docX["tagLoopExample.docx"].zip.files[r].options.compression).toBe(docX["tagLoopExampleImageExpected.docx"].zip.files[r].options.compression),expect(docX["tagLoopExample.docx"].zip.files[r].options.dir).toBe(docX["tagLoopExampleImageExpected.docx"].zip.files[r].options.dir),"word/_rels/document.xml.rels"!==r&&"[Content_Types].xml"!==r&&("browser"===o||"word/document.xml"!==r)&&(("function"==typeof(p=docX["tagLoopExample.docx"].zip.files[r]).data?p.data(0):void 0)&&expect(docX["tagLoopExample.docx"].zip.files[r].data.length).toBe(docX["tagLoopExampleImageExpected.docx"].zip.files[r].data.length),expect(docX["tagLoopExample.docx"].zip.files[r].data).toBe(docX["tagLoopExampleImageExpected.docx"].zip.files[r].data));return l=docX["tagLoopExample.docx"].zip.files["word/_rels/document.xml.rels"].data,t=docX["tagLoopExample.docx"].zip.files["[Content_Types].xml"].data,c=DocUtils.Str2xml(l),a=DocUtils.Str2xml(t),n=c.getElementsByTagName("Relationship"),i=a.getElementsByTagName("Default"),expect(n.length).toEqual(16),expect(i.length).toBe(3)})}),describe("qr code testing",function(){return it("should work with local QRCODE without tags",function(){var o;return docX["qrCodeExample.docx"]=new e(docXData["qrCodeExample.docx"],{},!1,!0),o=function(){return 1},docX["qrCodeExample.docx"].applyTags({},o),waitsFor(function(){return null!=docX["qrCodeExample.docx"].ready}),runs(function(){var e,o;expect(null!=docX["qrCodeExample.docx"].zip.files["word/media/Copie_0.png"]).toBeTruthy(),o=[];for(e in docX["qrCodeExample.docx"].zip.files)expect(docX["qrCodeExample.docx"].zip.files[e].options.date).not.toBe(docX["qrCodeExampleExpected.docx"].zip.files[e].options.date),expect(docX["qrCodeExample.docx"].zip.files[e].name).toBe(docX["qrCodeExampleExpected.docx"].zip.files[e].name),expect(docX["qrCodeExample.docx"].zip.files[e].options.base64).toBe(docX["qrCodeExampleExpected.docx"].zip.files[e].options.base64),expect(docX["qrCodeExample.docx"].zip.files[e].options.binary).toBe(docX["qrCodeExampleExpected.docx"].zip.files[e].options.binary),expect(docX["qrCodeExample.docx"].zip.files[e].options.compression).toBe(docX["qrCodeExampleExpected.docx"].zip.files[e].options.compression),o.push(expect(docX["qrCodeExample.docx"].zip.files[e].options.dir).toBe(docX["qrCodeExampleExpected.docx"].zip.files[e].options.dir));return o})}),it("should work with local QRCODE with {tags}",function(){var o;return docX["qrCodeTaggingExample.docx"]=new e(docXData["qrCodeTaggingExample.docx"],{image:"Firefox_logo"},!1,!0),o=function(){return 1},docX["qrCodeTaggingExample.docx"].applyTags({image:"Firefox_logo"},o),waitsFor(function(){return null!=docX["qrCodeTaggingExample.docx"].ready}),runs(function(){var e,o;expect(null!=docX["qrCodeTaggingExample.docx"].zip.files["word/media/Copie_0.png"]).toBeTruthy(),o=[];for(e in docX["qrCodeTaggingExample.docx"].zip.files)expect(docX["qrCodeTaggingExample.docx"].zip.files[e].options.date).not.toBe(docX["qrCodeTaggingExampleExpected.docx"].zip.files[e].options.date),expect(docX["qrCodeTaggingExample.docx"].zip.files[e].name).toBe(docX["qrCodeTaggingExampleExpected.docx"].zip.files[e].name),expect(docX["qrCodeTaggingExample.docx"].zip.files[e].options.base64).toBe(docX["qrCodeTaggingExampleExpected.docx"].zip.files[e].options.base64),expect(docX["qrCodeTaggingExample.docx"].zip.files[e].options.binary).toBe(docX["qrCodeTaggingExampleExpected.docx"].zip.files[e].options.binary),expect(docX["qrCodeTaggingExample.docx"].zip.files[e].options.compression).toBe(docX["qrCodeTaggingExampleExpected.docx"].zip.files[e].options.compression),o.push(expect(docX["qrCodeTaggingExample.docx"].zip.files[e].options.dir).toBe(docX["qrCodeTaggingExampleExpected.docx"].zip.files[e].options.dir));return o})}),it("should work with loop QRCODE with {tags}",function(){var o;return docX["qrCodeTaggingLoopExample.docx"]=new e(docXData["qrCodeTaggingLoopExample.docx"],{},!1,!0),o=function(){return 1},docX["qrCodeTaggingLoopExample.docx"].applyTags({images:[{image:"Firefox_logo"},{image:"image"}]},o),docX["qrCodeTaggingLoopExample.docx"],waitsFor(function(){return null!=docX["qrCodeTaggingLoopExample.docx"].ready}),runs(function(){var e,o;expect(null!=docX["qrCodeTaggingLoopExample.docx"].zip.files["word/media/Copie_0.png"]).toBeTruthy(),expect(null!=docX["qrCodeTaggingLoopExample.docx"].zip.files["word/media/Copie_1.png"]).toBeTruthy(),expect(null!=docX["qrCodeTaggingLoopExample.docx"].zip.files["word/media/Copie_2.png"]).toBeFalsy(),o=[];for(e in docX["qrCodeTaggingLoopExample.docx"].zip.files)expect(docX["qrCodeTaggingLoopExample.docx"].zip.files[e].options.date).not.toBe(docX["qrCodeTaggingLoopExampleExpected.docx"].zip.files[e].options.date),expect(docX["qrCodeTaggingLoopExample.docx"].zip.files[e].name).toBe(docX["qrCodeTaggingLoopExampleExpected.docx"].zip.files[e].name),expect(docX["qrCodeTaggingLoopExample.docx"].zip.files[e].options.base64).toBe(docX["qrCodeTaggingLoopExampleExpected.docx"].zip.files[e].options.base64),expect(docX["qrCodeTaggingLoopExample.docx"].zip.files[e].options.binary).toBe(docX["qrCodeTaggingLoopExampleExpected.docx"].zip.files[e].options.binary),expect(docX["qrCodeTaggingLoopExample.docx"].zip.files[e].options.compression).toBe(docX["qrCodeTaggingLoopExampleExpected.docx"].zip.files[e].options.compression),o.push(expect(docX["qrCodeTaggingLoopExample.docx"].zip.files[e].options.dir).toBe(docX["qrCodeTaggingLoopExampleExpected.docx"].zip.files[e].options.dir));return o})})})}).call(this);