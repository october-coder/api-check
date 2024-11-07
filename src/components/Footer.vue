<template>
  <div class="copyright">
    <p>give my a star <a href="https://github.com/QAbot-zh/query-key" target="_blank">github</a> <br> © 2024 by rick 和 megasoft
      <br>贡献者：
      <a href="https://linux.do/u/rick" target="_blank"><img src="https://linux.do/user_avatar/linux.do/rick/288/137821_2.png" alt="rick">rick</a>
      <a href="https://linux.do/u/zhong_little" target="_blank"><img src="https://linux.do/user_avatar/linux.do/zhong_little/288/104887_2.png" alt="Megasoft">Megasoft</a>
      <a href="https://linux.do/u/fangyuan99" target="_blank"><img src="https://linux.do/letter_avatar_proxy/v4/letter/f/b3f665/144.png" alt="fangyuan99">fangyuan99</a>
      <a href="https://github.com/juzeon" target="_blank"><img src="https://avatars.githubusercontent.com/u/12206799?s=60&v=4" alt="juzeon">juzeon</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
.copyright {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #666;
}

copyright img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: middle;
}

copyright a {
  color: #1e88e5;
  text-decoration: none;
}

copyright a:hover {
  text-decoration: underline;
}
</style>
