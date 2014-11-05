var res = {
    Back_png : "res/bg.png",
    Title_png : "res/sb.png",
    LeftPart_png : "res/heading-left.png",
    RightPart_png : "res/heading-right.png",
    Drop_png : "res/drop.png",
    Ball_png : "res/ball.png",
    Ball_fnt : "res/ball.fnt",
    Win_png : "res/win.png",
    Win_fnt : "res/win.fnt",
    Nominal_png : "res/nominal.png",
    Nominal_fnt : "res/nominal.fnt",
    Stage1_png: "res/st1.png",
    Stage2_png: "res/st2.png",
    Stage3_png: "res/st3.png",
    Stage4_png: "res/st4.png",
    Stage5_png: "res/st5.png",
    StageF_png: "res/stf.png",
    Grid_png: "res/grid.png",
    Ships_png: "res/ships.png",
    Ships_json: "res/ships.json",
    BackWin_png: "res/bg-win.png",
    WinParts_png: "res/win-parts.png",
    Money_png: "res/money.png"
};

var g_resources = [
    //image
    res.Back_png,
    res.Title_png,
    res.LeftPart_png,
    res.RightPart_png,
    res.Drop_png,
    res.Ball_png,
    res.Win_png,
    res.Nominal_png,
    res.Stage1_png,
    res.Stage2_png,
    res.Stage3_png,
    res.Stage4_png,
    res.Stage5_png,
    res.StageF_png,
    res.Grid_png,
    res.Ships_png,
    res.BackWin_png,
    res.WinParts_png,
    res.Money_png,

    //plist

    //fnt
    res.Ball_fnt,
    res.Win_fnt,
    res.Nominal_fnt,

    //tmx

    //bgm

    //effect

    //json
    res.Ships_json
];

// audio resources
var audioRes = {
    AddTicket_mp3 : "res/audio/addticket.mp3",
    Begin_mp3 : "res/audio/begin.mp3",
    Fire1_mp3 : "res/audio/fire1.mp3",
    Fire2_mp3 : "res/audio/fire2.mp3",
    Fire3_mp3 : "res/audio/fire3.mp3",
    Jackpot_mp3 : "res/audio/jackpot.mp3",
    Win_mp3 : "res/audio/win.mp3"
};

// preloaded resources
var preloaded = {};

preloaded["frameworks/cocos2d-html5/moduleConfig.json"] = {
    "module" : {
        "actions" : [
            "core",

            "cocos2d/actions/CCAction.js",
            "cocos2d/actions/CCActionInterval.js",
            "cocos2d/actions/CCActionInstant.js",
            "cocos2d/actions/CCActionCamera.js",
            "cocos2d/actions/CCActionEase.js",
            "cocos2d/actions/CCActionCatmullRom.js",
            "cocos2d/actions/CCActionTween.js"
        ],
        "actions3d" : [
            "core", "kazmath", "shaders", "actions", "effects", "render-texture",

            "cocos2d/actions3d/CCActionGrid.js",
            "cocos2d/actions3d/CCActionGrid3D.js",
            "cocos2d/actions3d/CCActionTiledGrid.js",
            "cocos2d/actions3d/CCActionPageTurn3D.js"
        ],
        "audio" : [
            "core",

            "cocos2d/audio/CCAudio.js"
        ],
        "clipping-nodes" : [
            "core", "shape-nodes",

            "cocos2d/clipping-nodes/CCClippingNode.js"
        ],
        "compression" : [
            "core",

            "cocos2d/compression/ZipUtils.js",
            "cocos2d/compression/base64.js",
            "cocos2d/compression/gzip.js",
            "cocos2d/compression/zlib.min.js"
        ],
        "core" : [
            "CCDebugger.js",
            "cocos2d/core/utils/BinaryLoader.js",
            "Base64Images.js",
            "cocos2d/core/platform/CCClass.js",
            "cocos2d/core/platform/CCCommon.js",
            "cocos2d/core/cocoa/CCGeometry.js",
            "cocos2d/core/platform/CCSAXParser.js",
            "cocos2d/core/platform/CCLoaders.js",
            "cocos2d/core/platform/CCConfig.js",
            "cocos2d/core/platform/miniFramework.js",
            "cocos2d/core/platform/CCMacro.js",
            "cocos2d/core/platform/CCTypesWebGL.js",
            "cocos2d/core/platform/CCTypesPropertyDefine.js",
            "cocos2d/core/platform/CCTypes.js",
            "cocos2d/core/platform/CCEGLView.js",
            "cocos2d/core/platform/CCScreen.js",
            "cocos2d/core/platform/CCVisibleRect.js",

            "cocos2d/core/platform/CCInputManager.js",
            "cocos2d/core/platform/CCInputExtension.js",

            "cocos2d/core/cocoa/CCAffineTransform.js",
            "cocos2d/core/support/CCPointExtension.js",
            "cocos2d/core/support/CCVertex.js",
            "cocos2d/core/support/TransformUtils.js",
            "cocos2d/core/event-manager/CCTouch.js",

            "cocos2d/core/event-manager/CCEvent.js",
            "cocos2d/core/event-manager/CCEventListener.js",
            "cocos2d/core/event-manager/CCEventManager.js",
            "cocos2d/core/event-manager/CCEventExtension.js",

            "cocos2d/core/base-nodes/BaseNodesWebGL.js",
            "cocos2d/core/base-nodes/BaseNodesPropertyDefine.js",
            "cocos2d/core/base-nodes/CCNode.js",
            "cocos2d/core/base-nodes/CCAtlasNode.js",

            "cocos2d/core/textures/TexturesWebGL.js",
            "cocos2d/core/textures/TexturesPropertyDefine.js",
            "cocos2d/core/textures/CCTexture2D.js",
            "cocos2d/core/textures/CCTextureCache.js",
            "cocos2d/core/textures/CCTextureAtlas.js",

            "cocos2d/core/scenes/CCScene.js",
            "cocos2d/core/scenes/CCLoaderScene.js",

            "cocos2d/core/layers/CCLayerWebGL.js",
            "cocos2d/core/layers/CCLayerPropertyDefine.js",
            "cocos2d/core/layers/CCLayer.js",

            "cocos2d/core/sprites/SpritesWebGL.js",
            "cocos2d/core/sprites/SpritesPropertyDefine.js",
            "cocos2d/core/sprites/CCSprite.js",
            "cocos2d/core/sprites/CCSpriteBatchNode.js",
            "cocos2d/core/sprites/CCBakeSprite.js",
            "cocos2d/core/sprites/CCAnimation.js",
            "cocos2d/core/sprites/CCAnimationCache.js",
            "cocos2d/core/sprites/CCSpriteFrame.js",
            "cocos2d/core/sprites/CCSpriteFrameCache.js",
            "cocos2d/core/CCConfiguration.js",

            "cocos2d/core/CCDirectorWebGL.js",
            "cocos2d/core/CCDirector.js",

            "cocos2d/core/CCCamera.js",
            "cocos2d/core/CCScheduler.js",
            "cocos2d/core/CCDrawingPrimitivesCanvas.js",
            "cocos2d/core/CCDrawingPrimitivesWebGL.js",

            "cocos2d/core/labelttf/LabelTTFWebGL.js",
            "cocos2d/core/labelttf/LabelTTFPropertyDefine.js",
            "cocos2d/core/labelttf/CCLabelTTF.js",

            "cocos2d/core/CCActionManager.js"
        ],
        "effects" : [
            "core",

            "cocos2d/effects/CCGrid.js",
            "cocos2d/effects/CCGrabber.js"
        ],
        "kazmath" : [
            "core",

            "cocos2d/kazmath/utility.js",
            "cocos2d/kazmath/vec2.js",
            "cocos2d/kazmath/vec3.js",
            "cocos2d/kazmath/vec4.js",
            "cocos2d/kazmath/ray2.js",
            "cocos2d/kazmath/mat3.js",
            "cocos2d/kazmath/mat4.js",
            "cocos2d/kazmath/plane.js",
            "cocos2d/kazmath/quaternion.js",
            "cocos2d/kazmath/aabb.js",
            "cocos2d/kazmath/gl/mat4stack.js",
            "cocos2d/kazmath/gl/matrix.js"
        ],
        "labels" : [
            "core",

            "cocos2d/labels/CCLabelAtlas.js",
            "cocos2d/labels/CCLabelBMFont.js"
        ],
        "menus" : [
            "core", "actions",

            "cocos2d/menus/CCMenuItem.js",
            "cocos2d/menus/CCMenu.js"
        ],
        "motion-streak" : [
            "core", "shaders", "kazmath", "labels",

            "cocos2d/motion-streak/CCMotionStreak.js"
        ],
        "node-grid" : [
            "core",

            "cocos2d/node-grid/CCNodeGrid.js"
        ],
        "parallax" : [
            "core",

            "cocos2d/parallax/CCParallaxNode.js"
        ],
        "particle" : [
            "core", "compression",

            "cocos2d/particle/CCPNGReader.js",
            "cocos2d/particle/CCTIFFReader.js",
            "cocos2d/particle/CCParticleSystem.js",
            "cocos2d/particle/CCParticleExamples.js",
            "cocos2d/particle/CCParticleBatchNode.js"
        ],
        "physics" : [
            "core", "shape-nodes",

            "cocos2d/physics/CCPhysicsSprite.js",
            "cocos2d/physics/CCPhysicsDebugNode.js"
        ],
        "progress-timer" : [
            "core", "actions",

            "cocos2d/progress-timer/CCProgressTimer.js",
            "cocos2d/progress-timer/CCActionProgressTimer.js"
        ],
        "render-texture" : [
            "core",

            "cocos2d/render-texture/CCRenderTexture.js"
        ],
        "shaders" : [
            "core", "kazmath",

            "cocos2d/shaders/CCShaders.js",
            "cocos2d/shaders/CCShaderCache.js",
            "cocos2d/shaders/CCGLProgram.js",
            "cocos2d/shaders/CCGLStateCache.js"
        ],
        "shape-nodes" : [
            "core",

            "cocos2d/shape-nodes/CCDrawNode.js"
        ],
        "text-input" : [
            "core",

            "cocos2d/text-input/CCIMEDispatcher.js",
            "cocos2d/text-input/CCTextFieldTTF.js"
        ],
        "tilemap" : [
            "core", "compression",

            "cocos2d/tilemap/CCTGAlib.js",
            "cocos2d/tilemap/CCTMXTiledMap.js",
            "cocos2d/tilemap/CCTMXXMLParser.js",
            "cocos2d/tilemap/CCTMXObjectGroup.js",
            "cocos2d/tilemap/CCTMXLayer.js"
        ],
        "transitions" : [
            "core", "actions", "render-texture", "progress-timer",

            "cocos2d/transitions/CCTransition.js",
            "cocos2d/transitions/CCTransitionProgress.js",
            "cocos2d/transitions/CCTransitionPageTurn.js"
        ],

        "base4webgl" : ["core", "kazmath", "shaders"],
        "cocos2d" : [
            "core", "kazmath", "shaders", "render-texture", "motion-streak", "node-grid",
            "clipping-nodes", "effects", "shape-nodes", "actions", "actions3d",
            "progress-timer", "transitions", "labels", "compression", "particle",
            "text-input", "menus", "tilemap", "parallax", "audio"
        ],



        "ccbreader" : [
            "core", "audio", "gui", "menus", "particle", "actions", "labels",

            "extensions/ccb-reader/CCNodeLoader.js",
            "extensions/ccb-reader/CCBReaderUtil.js",
            "extensions/ccb-reader/CCControlLoader.js",
            "extensions/ccb-reader/CCSpriteLoader.js",
            "extensions/ccb-reader/CCNodeLoaderLibrary.js",
            "extensions/ccb-reader/CCBReader.js",
            "extensions/ccb-reader/CCBValue.js",
            "extensions/ccb-reader/CCBKeyframe.js",
            "extensions/ccb-reader/CCBSequence.js",
            "extensions/ccb-reader/CCBRelativePositioning.js",
            "extensions/ccb-reader/CCBAnimationManager.js"
        ],
        "editbox" : [
            "core", "gui",

            "extensions/editbox/CCdomNode.js",
            "extensions/editbox/CCEditBox.js"
        ],
        "ccpool" : [
            "core", "gui",

            "extensions/ccpool/CCPool.js"
        ],
        "ccui" : [
            "core", "gui", "actions", "labels", "text-input","clipping-nodes",
            "extensions/ccui/base-classes/CCProtectedNode.js",
            "extensions/ccui/system/CocosGUI.js",
            "extensions/ccui/base-classes/UIWidget.js",
            "extensions/ccui/layouts/UILayout.js",
            "extensions/ccui/layouts/UILayoutParameter.js",
            "extensions/ccui/layouts/UILayoutManager.js",
            "extensions/ccui/layouts/UIHBox.js",
            "extensions/ccui/layouts/UIRelativeBox.js",
            "extensions/ccui/layouts/UIVBox.js",
            "extensions/ccui/system/UIHelper.js",
            "extensions/ccui/uiwidgets/UIButton.js",
            "extensions/ccui/uiwidgets/UICheckBox.js",
            "extensions/ccui/uiwidgets/UIImageView.js",
            "extensions/ccui/uiwidgets/UILoadingBar.js",
            "extensions/ccui/uiwidgets/UISlider.js",
            "extensions/ccui/uiwidgets/UIText.js",
            "extensions/ccui/uiwidgets/UITextAtlas.js",
            "extensions/ccui/uiwidgets/UITextBMFont.js",
            "extensions/ccui/uiwidgets/UITextField.js",
            "extensions/ccui/uiwidgets/UIRichText.js",
            "extensions/ccui/uiwidgets/scroll-widget/UIScrollView.js",
            "extensions/ccui/uiwidgets/scroll-widget/UIListView.js",
            "extensions/ccui/uiwidgets/scroll-widget/UIPageView.js"
        ],
        "cocostudio" : [
            "core",  "tilemap", "particle", "shape-nodes", "ccui",

            "extensions/cocostudio/components/CCComponent.js",
            "extensions/cocostudio/components/CCComponentContainer.js",
            "extensions/cocostudio/CocoStudio.js",
            "extensions/cocostudio/ActionManagerEx.js",

            "extensions/cocostudio/armature/utils/CCArmatureDefine.js",
            "extensions/cocostudio/armature/utils/CCDataReaderHelper.js",
            "extensions/cocostudio/armature/utils/CCSpriteFrameCacheHelper.js",
            "extensions/cocostudio/armature/utils/CCTransformHelp.js",
            "extensions/cocostudio/armature/utils/CCTweenFunction.js",
            "extensions/cocostudio/armature/utils/CCUtilMath.js",
            "extensions/cocostudio/armature/utils/CCArmatureDataManager.js",
            "extensions/cocostudio/armature/datas/CCDatas.js",
            "extensions/cocostudio/armature/display/CCDecorativeDisplay.js",
            "extensions/cocostudio/armature/display/CCDisplayFactory.js",
            "extensions/cocostudio/armature/display/CCDisplayManager.js",
            "extensions/cocostudio/armature/display/CCSkin.js",
            "extensions/cocostudio/armature/animation/CCProcessBase.js",
            "extensions/cocostudio/armature/animation/CCArmatureAnimation.js",
            "extensions/cocostudio/armature/animation/CCTween.js",
            "extensions/cocostudio/armature/physics/CCColliderDetector.js",
            "extensions/cocostudio/armature/CCArmature.js",
            "extensions/cocostudio/armature/CCBone.js",

            "extensions/cocostudio/action/CCActionFrame.js",
            "extensions/cocostudio/action/CCActionManager.js",
            "extensions/cocostudio/action/CCActionNode.js",
            "extensions/cocostudio/action/CCActionObject.js",

            "extensions/cocostudio/components/CCComAttribute.js",
            "extensions/cocostudio/components/CCComAudio.js",
            "extensions/cocostudio/components/CCComController.js",
            "extensions/cocostudio/components/CCComRender.js",

            "extensions/cocostudio/trigger/ObjectFactory.js",
            "extensions/cocostudio/trigger/TriggerBase.js",
            "extensions/cocostudio/trigger/TriggerMng.js",
            "extensions/cocostudio/trigger/TriggerObj.js",

            "extensions/cocostudio/reader/GUIReader.js",
            "extensions/cocostudio/reader/SceneReader.js",
            "extensions/cocostudio/reader/widgetreader/WidgetReaderProtocol.js",
            "extensions/cocostudio/reader/widgetreader/WidgetReader.js",

            "extensions/cocostudio/reader/widgetreader/ButtonReader/ButtonReader.js",
            "extensions/cocostudio/reader/widgetreader/CheckBoxReader/CheckBoxReader.js",
            "extensions/cocostudio/reader/widgetreader/ImageViewReader/ImageViewReader.js",
            "extensions/cocostudio/reader/widgetreader/LabelAtlasReader/LabelAtlasReader.js",
            "extensions/cocostudio/reader/widgetreader/LabelBMFontReader/LabelBMFontReader.js",
            "extensions/cocostudio/reader/widgetreader/LabelReader/LabelReader.js",
            "extensions/cocostudio/reader/widgetreader/LayoutReader/LayoutReader.js",
            "extensions/cocostudio/reader/widgetreader/ScrollViewReader/ScrollViewReader.js",
            "extensions/cocostudio/reader/widgetreader/ListViewReader/ListViewReader.js",
            "extensions/cocostudio/reader/widgetreader/LoadingBarReader/LoadingBarReader.js",
            "extensions/cocostudio/reader/widgetreader/PageViewReader/PageViewReader.js",
            "extensions/cocostudio/reader/widgetreader/SliderReader/SliderReader.js",
            "extensions/cocostudio/reader/widgetreader/TextFieldReader/TextFieldReader.js"
        ],
        "gui" : [
            "core", "clipping-nodes", "render-texture", "actions", "progress-timer",

            "extensions/gui/control-extension/CCControl.js",
            "extensions/gui/control-extension/CCControlButton.js",
            "extensions/gui/control-extension/CCControlUtils.js",
            "extensions/gui/control-extension/CCInvocation.js",
            "extensions/gui/control-extension/CCScale9Sprite.js",
            "extensions/gui/control-extension/CCMenuPassive.js",
            "extensions/gui/control-extension/CCControlSaturationBrightnessPicker.js",
            "extensions/gui/control-extension/CCControlHuePicker.js",
            "extensions/gui/control-extension/CCControlColourPicker.js",
            "extensions/gui/control-extension/CCControlSlider.js",
            "extensions/gui/control-extension/CCControlSwitch.js",
            "extensions/gui/control-extension/CCControlStepper.js",
            "extensions/gui/control-extension/CCControlPotentiometer.js",
            "extensions/gui/scrollview/CCScrollView.js",
            "extensions/gui/scrollview/CCSorting.js",
            "extensions/gui/scrollview/CCTableView.js"
        ],

        "pluginx" : [
            "core",

            "external/pluginx/Plugin.js"
        ],
        "plugin-facebook" : [
            "external/pluginx/platform/facebook_sdk.js",
            "external/pluginx/platform/facebook.js"
        ],

        "spine":[
            "core",

            "extensions/spine/Spine.js",
            "extensions/spine/CCSkeleton.js",
            "extensions/spine/CCSkeletonAnimation.js"
        ],
        "extensions" : ["gui", "ccbreader", "editbox", "cocostudio", "spine", "ccpool"],

        "box2d" : [
            "core", "physics",

            "external/box2d/box2d.js"
        ],
        "chipmunk" : [
            "core", "physics",

            "external/chipmunk/chipmunk.js"
        ],
        "socketio" : [
            "external/socketio/socket.io.min.js"
        ],
        "external" : ["box2d", "chipmunk", "socketio", "pluginx"]
    },
    "bootFile" : "CCBoot.js"
};
preloaded["project.json"] = {
    "project_type": "javascript",

    "debugMode" : 1,
    "showFPS" : false,
    "frameRate" : 60,
    "id" : "gameCanvas",
    "renderMode" : 1,
    "engineDir":"frameworks/cocos2d-html5",

    "modules" : ["cocos2d","extensions"],

    "jsList" : [
        "src/i18n/en.js",
        "src/i18n/ru.js",
        "src/subver/ru/coeff.js",
        "src/subver/ru/langs.js",
        "src/subver/ru/nominals.js",
        "src/lang.js",
        "src/api.js",
        "src/network.js",
        "src/controller.js",
        "src/ship.js",
        "src/ticket.js",
        "src/tickets.js",
        "src/views/ticketview.js",
        "src/views/scene.js"
    ]
};
preloaded[res.Ball_fnt] = 'info face=\"AcademyC\" size=120 bold=1 italic=0 charset=\"\" unicode=0 stretchH=100 smooth=1 aa=1 padding=0,0,0,0 spacing=2,2\ncommon lineHeight=109 base=123 scaleW=231 scaleH=278 pages=1 packed=0\npage id=0 file=\"ball.png\"\nchars count=11\nchar id=32     x=220   y=186   width=0     height=0     xoffset=0     yoffset=86    xadvance=28    page=0 chnl=0 letter=\"space\"\nchar id=48     x=2     y=2     width=61    height=90    xoffset=5     yoffset=-3    xadvance=70    page=0 chnl=0 letter=\"0\"\nchar id=49     x=178   y=186   width=40    height=87    xoffset=5     yoffset=-1    xadvance=47    page=0 chnl=0 letter=\"1\"\nchar id=50     x=69    y=186   width=55    height=89    xoffset=4     yoffset=-3    xadvance=61    page=0 chnl=0 letter=\"2\"\nchar id=51     x=116   y=94    width=51    height=90    xoffset=5     yoffset=-3    xadvance=57    page=0 chnl=0 letter=\"3\"\nchar id=52     x=2     y=186   width=65    height=89    xoffset=4     yoffset=-3    xadvance=69    page=0 chnl=0 letter=\"4\"\nchar id=53     x=61    y=94    width=53    height=90    xoffset=5     yoffset=-3    xadvance=60    page=0 chnl=0 letter=\"5\"\nchar id=54     x=65    y=2     width=59    height=90    xoffset=5     yoffset=-3    xadvance=68    page=0 chnl=0 letter=\"6\"\nchar id=55     x=126   y=186   width=50    height=87    xoffset=6     yoffset=-1    xadvance=56    page=0 chnl=0 letter=\"7\"\nchar id=56     x=2     y=94    width=57    height=90    xoffset=4     yoffset=-3    xadvance=61    page=0 chnl=0 letter=\"8\"\nchar id=57     x=126   y=2     width=59    height=90    xoffset=5     yoffset=-3    xadvance=68    page=0 chnl=0 letter=\"9\"\n';
preloaded[res.Win_fnt] = 'info face=\"AcademyC\" size=72 bold=1 italic=0 charset=\"\" unicode=0 stretchH=100 smooth=1 aa=1 padding=0,0,0,0 spacing=2,2\ncommon lineHeight=65 base=74 scaleW=256 scaleH=128 pages=1 packed=0\npage id=0 file=\"win.png\"\nchars count=11\nchar id=32     x=130   y=59    width=0     height=0     xoffset=0     yoffset=52    xadvance=17    page=0 chnl=0 letter=\"space\"\nchar id=48     x=44    y=2     width=38    height=55    xoffset=3     yoffset=-2    xadvance=42    page=0 chnl=0 letter=\"0\"\nchar id=49     x=103   y=59    width=25    height=54    xoffset=3     yoffset=-2    xadvance=28    page=0 chnl=0 letter=\"1\"\nchar id=50     x=199   y=2     width=34    height=55    xoffset=2     yoffset=-3    xadvance=37    page=0 chnl=0 letter=\"2\"\nchar id=51     x=37    y=59    width=31    height=55    xoffset=3     yoffset=-2    xadvance=34    page=0 chnl=0 letter=\"3\"\nchar id=52     x=2     y=2     width=40    height=55    xoffset=2     yoffset=-3    xadvance=42    page=0 chnl=0 letter=\"4\"\nchar id=53     x=2     y=59    width=33    height=55    xoffset=3     yoffset=-2    xadvance=36    page=0 chnl=0 letter=\"5\"\nchar id=54     x=84    y=2     width=37    height=55    xoffset=3     yoffset=-2    xadvance=41    page=0 chnl=0 letter=\"6\"\nchar id=55     x=70    y=59    width=31    height=54    xoffset=4     yoffset=-2    xadvance=34    page=0 chnl=0 letter=\"7\"\nchar id=56     x=162   y=2     width=35    height=55    xoffset=2     yoffset=-2    xadvance=37    page=0 chnl=0 letter=\"8\"\nchar id=57     x=123   y=2     width=37    height=55    xoffset=3     yoffset=-2    xadvance=41    page=0 chnl=0 letter=\"9\"\n';
preloaded[res.Nominal_fnt] = 'info face=\"AcademyC\" size=28 bold=0 italic=0 charset=\"\" unicode=0 stretchH=100 smooth=1 aa=1 padding=0,0,0,0 spacing=2,2\ncommon lineHeight=25 base=29 scaleW=128 scaleH=64 pages=1 packed=0\npage id=0 file=\"nominal.png\"\nchars count=11\nchar id=32     x=46    y=28    width=0     height=0     xoffset=0     yoffset=21    xadvance=7     page=0 chnl=0 letter=\"space\"\nchar id=48     x=53    y=2     width=14    height=24    xoffset=1     yoffset=-3    xadvance=14    page=0 chnl=0 letter=\"0\"\nchar id=49     x=34    y=28    width=10    height=23    xoffset=1     yoffset=-2    xadvance=11    page=0 chnl=0 letter=\"1\"\nchar id=50     x=2     y=28    width=15    height=23    xoffset=1     yoffset=-2    xadvance=14    page=0 chnl=0 letter=\"2\"\nchar id=51     x=69    y=2     width=14    height=24    xoffset=1     yoffset=-3    xadvance=13    page=0 chnl=0 letter=\"3\"\nchar id=52     x=100   y=2     width=15    height=23    xoffset=1     yoffset=-2    xadvance=14    page=0 chnl=0 letter=\"4\"\nchar id=53     x=85    y=2     width=13    height=24    xoffset=1     yoffset=-3    xadvance=13    page=0 chnl=0 letter=\"5\"\nchar id=54     x=2     y=2     width=15    height=24    xoffset=1     yoffset=-3    xadvance=15    page=0 chnl=0 letter=\"6\"\nchar id=55     x=19    y=28    width=13    height=23    xoffset=2     yoffset=-2    xadvance=14    page=0 chnl=0 letter=\"7\"\nchar id=56     x=36    y=2     width=15    height=24    xoffset=1     yoffset=-3    xadvance=15    page=0 chnl=0 letter=\"8\"\nchar id=57     x=19    y=2     width=15    height=24    xoffset=1     yoffset=-3    xadvance=15    page=0 chnl=0 letter=\"9\"\n';
preloaded[res.Ships_json] = {"frames": {

    "sh2-0":
    {
        "frame": {"x":390,"y":160,"w":55,"h":80},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":55,"h":80},
        "sourceSize": {"w":55,"h":80}
    },
    "sh2-1":
    {
        "frame": {"x":414,"y":80,"w":55,"h":80},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":55,"h":80},
        "sourceSize": {"w":55,"h":80}
    },
    "sh2":
    {
        "frame": {"x":414,"y":0,"w":55,"h":80},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":55,"h":80},
        "sourceSize": {"w":55,"h":80}
    },
    "sh2b":
    {
        "frame": {"x":335,"y":136,"w":55,"h":80},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":55,"h":80},
        "sourceSize": {"w":55,"h":80}
    },
    "sh3-0":
    {
        "frame": {"x":268,"y":136,"w":67,"h":110},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":67,"h":110},
        "sourceSize": {"w":67,"h":110}
    },
    "sh3-1":
    {
        "frame": {"x":201,"y":136,"w":67,"h":110},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":67,"h":110},
        "sourceSize": {"w":67,"h":110}
    },
    "sh3-2":
    {
        "frame": {"x":134,"y":136,"w":67,"h":110},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":67,"h":110},
        "sourceSize": {"w":67,"h":110}
    },
    "sh3":
    {
        "frame": {"x":67,"y":136,"w":67,"h":110},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":67,"h":110},
        "sourceSize": {"w":67,"h":110}
    },
    "sh3b":
    {
        "frame": {"x":0,"y":136,"w":67,"h":110},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":67,"h":110},
        "sourceSize": {"w":67,"h":110}
    },
    "sh4-0":
    {
        "frame": {"x":345,"y":0,"w":69,"h":136},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":69,"h":136},
        "sourceSize": {"w":69,"h":136}
    },
    "sh4-1":
    {
        "frame": {"x":276,"y":0,"w":69,"h":136},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":69,"h":136},
        "sourceSize": {"w":69,"h":136}
    },
    "sh4-2":
    {
        "frame": {"x":207,"y":0,"w":69,"h":136},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":69,"h":136},
        "sourceSize": {"w":69,"h":136}
    },
    "sh4-3":
    {
        "frame": {"x":138,"y":0,"w":69,"h":136},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":69,"h":136},
        "sourceSize": {"w":69,"h":136}
    },
    "sh4":
    {
        "frame": {"x":69,"y":0,"w":69,"h":136},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":69,"h":136},
        "sourceSize": {"w":69,"h":136}
    },
    "sh4b":
    {
        "frame": {"x":0,"y":0,"w":69,"h":136},
        "rotated": false,
        "trimmed": false,
        "spriteSourceSize": {"x":0,"y":0,"w":69,"h":136},
        "sourceSize": {"w":69,"h":136}
    }},
    "meta": {
        "app": "http://www.codeandweb.com/texturepacker ",
        "version": "1.0",
        "image": "ships.png",
        "format": "RGBA8888",
        "size": {"w":469,"h":246},
        "scale": "1",
        "smartupdate": "$TexturePacker:SmartUpdate:4cb7c7311a0bde34eb666cf44576ff44:489d8648848eed5d13a11759977636b2:78154fe33c5dfc8c7f67f0a3677ac0ac$"
    }
};