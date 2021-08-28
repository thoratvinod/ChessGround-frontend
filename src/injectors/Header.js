
const Header = (id) => {

  const saveSettings = (settings) => {
    console.log()
  }
  
  const headerController = () => {
  
    $('#btnSetting').click((event) => {
      console.log("Clicked...");
      $('#settingModal').dialog({
        minWidth: 500,
        minHeight: 500,
        title: "Settings",
      });
    })
  
  }
	
  const template = `
    <Header>
      <i class='fa fa-cog' id="btnSetting"></i>
      <div id="settingModal" title="Basic dialog" hidden>
        <table id="modalTable">
          <tbody>
            <tr>
              <td>Choose board type:  </td>
              <td>
                <select class="modalSelectStyle">
                  <option>PlayGround</option>
                  <option>Match</option>
                  <option>Disable</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Header>
      `
  $(`#${id}`).append(template);

  // $('#boardTypeDropdown').selectmenu();

  headerController();

};

export default Header;