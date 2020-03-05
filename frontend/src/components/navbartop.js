import React from 'react';

const nav = () => {
    return (<div>
      <svg class="Rectangle_100">
		<rect fill="#ffffff" id="Rectangle_100" rx="5" ry="5" x="0" y="0" width="1920" height="131">

         </rect></svg>
     <svg class="Rectangle_101">
		<rect id="Rectangle_101" rx="5" ry="5" x="0" y="0">

         </rect></svg>


    <div id="heading">
		<span style="color: #0093E9">VACCINE</span><span>LEDGER</span>
	</div>

    <div class="search-container">
    <form action="/search">
      <input type="text" placeholder="Search.." name="search"></input>
      <button type="submit"><i class="fa fa-search"></i></button>
    </form>
  </div>
    <div class="notifications">
          <button type="submit"><i class="fa fa-bell"></i></button>
</div>
       <svg class="Rectangle_102">
		<rect id="Rectangle_102" fill="#d9d9d9" rx="0" ry="0" x="0" y="0" width="2" height="40">

           </rect></svg>
    <div id="username">
    <span>John Doe</span>
    </div>
    <div id="userpic">
    <img src="vac.jpg" width="40px" height="40px"></img>
    </div>
    <div class="dropdown">
     <i1 class="down"></i1>
        </div></div>
);
};

export default nav;
