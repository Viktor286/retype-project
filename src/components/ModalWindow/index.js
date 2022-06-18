import {useSelector, useDispatch} from 'react-redux';
import {setModal, unsetModal} from "../../model/redux/ui";
import "./index.css";
import LicenseInfo from "./ContentTemplates/LicenseInfo";
import CompletionScreen from "./ContentTemplates/CompletionScreen";

let dispatch;

function markBodyAsModalActive() {
  window.document.body.classList.add('modal-active');
}

function unmarkBodyAsModalActive() {
  window.document.body.classList.remove('modal-active');
}

function removeHashFromUrl() {
  const uri = window.location.toString();
  if (uri.indexOf("#") > 0) {
    const cleanUri = uri.substring(0, uri.indexOf("#"));
    window.history.replaceState({}, document.title, cleanUri);
  }
}

const onDocumentHandler = (e) => {
  if (e.key === "Escape") {
    disableModalWindow();
    return;
  }
  e.stopPropagation();
};

function onModalOutsideClick(e) {
  if (
    e.target.classList.contains('modal') ||
    e.target.classList.contains('modal-body')
  ) {
    disableModalWindow();
  }
}

function uninstallModalWindow() {
  window.document.removeEventListener('keydown', onDocumentHandler, {capture: true});
  unmarkBodyAsModalActive();
  removeHashFromUrl();
}

function installModalWindow() {
  markBodyAsModalActive();
  window.document.addEventListener('keydown', onDocumentHandler, {capture: true});
}

export function enableModalWindow(modalWindowComponentName, staticModalContent = null) {
  dispatch(setModal({modalWindowComponentName, staticModalContent}));
}

export function disableModalWindow() {
  dispatch(unsetModal());
}

let isInitialRender = true;

export default function ModalWindow() {
  const {modalLayout, modalContent} = useSelector(s => s.ui);
  dispatch = useDispatch();

  if (isInitialRender) {
    isInitialRender = false;
    // Don't render (skip) ModalWindow on initial render, render something only after other components are ready.
    // (this bypasses "hash remove" step)
    return null;
  }

  if (!modalLayout) {
    uninstallModalWindow();
    return null;
  }

  let ModalTemplate = null;
  switch (modalLayout) {
    case 'LicenseInfo':
      ModalTemplate = LicenseInfo;
      break;
    case 'CompletionScreen':
      ModalTemplate = CompletionScreen;
      break;
    default:
      ModalTemplate = null;
  }

  installModalWindow();

  return <section className="modal" onClick={onModalOutsideClick}>
    <div className="modal-frame">
      <div className="modal-body">
        <ModalTemplate {...modalContent} />
      </div>
    </div>
  </section>
}
