const headerController = () => {

  $('#btnSetting').click((event) => {
    console.log("Clicked...");
    $('#settingModal').dialog();
  })

}

const Header = (id) => {
	
  const template = `
      <Header>
        <i class='fa fa-cog' id="btnSetting"></i>
        <div id="settingModal" title="Basic dialog" hidden>
          <p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the &apos;x&apos; icon.</p>
        </div>
      </Header>
    `
  $(`#${id}`).append(template);

  headerController();

};

export default Header;