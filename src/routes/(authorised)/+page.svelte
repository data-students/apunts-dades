<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.ts";

  import { goto } from "$app/navigation";
  import { pb } from "$lib/pocketbase.ts";

  async function logout() {
    pb.authStore.clear();
    goto("/inicia-sessio");
  }
</script>

<div>
    <Button onclick={logout}>Logout</Button>
</div>