<script>
  import { Button } from "$lib/components/ui/button/index.js";

  import { goto } from "$app/navigation.js";
  import { pb } from "$lib/pocketbase.js";

  async function logout() {
    pb.authStore.clear();
    goto("/inicia-sessio");
  }
</script>

<div>
    <Button onclick={logout}>Logout</Button>
</div>